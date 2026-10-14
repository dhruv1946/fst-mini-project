'use server';

import { executeAtomicReservation } from '@/app/lib/atomic-reservation';
import { getCurrentUser } from '@/app/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function claimItemAction(formData: FormData) {
  const listingId = String(formData.get('listingId'));
  const rentalDays = parseInt(String(formData.get('days') || '7'), 10);

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect(`/login?error=login_required&redirect=/listing/${listingId}`);
  }
  const renterId = currentUser.id;

  const result = await executeAtomicReservation(listingId, renterId, rentalDays);

  if (!result.success || !result.reservation) {
    // Return error message via redirect query or throw handled state
    redirect(`/listing/item/${listingId}?error=${encodeURIComponent(result.error || 'Failed to reserve')}`);
  }

  // Revalidate relevant views in single roundtrip as per Next.js 16 Server Actions docs
  revalidatePath('/my-listings');
  revalidatePath(`/receipt/${result.reservation.id}`);

  // Redirect to official digital transaction receipt
  redirect(`/receipt/${result.reservation.id}?claim=success&latency=${result.transactionLatencyMs}`);
}
