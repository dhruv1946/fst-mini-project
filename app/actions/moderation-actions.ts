'use server';

import { DatabaseService } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export async function approveListingAction(listingId: string) {
  await DatabaseService.updateListingStatus(listingId, 'AVAILABLE');
  revalidatePath('/admin/moderation');
  revalidatePath('/listing/ALL');
}

export async function rejectListingAction(listingId: string) {
  await DatabaseService.updateListingStatus(listingId, 'REJECTED');
  revalidatePath('/admin/moderation');
  revalidatePath('/listing/ALL');
}

export async function resolveDisputeAction(formData: FormData) {
  const disputeId = String(formData.get('disputeId'));
  const notes = String(formData.get('notes') || 'Resolved by lab moderator after checking component.');
  const status = (formData.get('status') || 'RESOLVED') as any;

  await DatabaseService.resolveDispute(disputeId, notes, status);
  revalidatePath('/admin/moderation');
}
