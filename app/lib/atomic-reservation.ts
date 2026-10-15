import { DatabaseService } from './db';
import { ReservationData } from './seed-data';

export interface AtomicClaimResult {
  success: boolean;
  reservation?: ReservationData;
  error?: string;
  transactionLatencyMs: number;
  timestamp: string;
  auditSignature: string;
}

/**
 * Atomic Reservation Engine
 * 
 * Lab Experiment Goal:
 * Guarantees that even if two students trigger a claim at the exact same millisecond,
 * strict atomic isolation prevents double-reservation.
 * Transitions item status: 'AVAILABLE' -> 'RESERVED'.
 */
export async function executeAtomicReservation(
  listingId: string,
  renterId: string,
  rentalDays: number = 7
): Promise<AtomicClaimResult> {
  const startTime = Date.now();

  const result = await DatabaseService.claimItemAtomically({
    listingId,
    renterId,
    days: rentalDays,
  });

  const latency = Date.now() - startTime;
  const auditSignature = `TX-HASH-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

  if (!result.success || !result.reservation) {
    return {
      success: false,
      error: result.error || 'Failed to claim item.',
      transactionLatencyMs: latency,
      timestamp: new Date().toISOString(),
      auditSignature,
    };
  }

  return {
    success: true,
    reservation: result.reservation,
    transactionLatencyMs: latency,
    timestamp: new Date().toISOString(),
    auditSignature,
  };
}
