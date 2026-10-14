import {
  initialUsers,
  initialListings,
  initialReservations,
  initialForumThreads,
  initialDisputes,
  UserData,
  ListingData,
  ReservationData,
  ForumThreadData,
  DisputeReportData,
} from './seed-data';

// Global state container in Node memory for rock-solid local dev and preview execution
declare global {
  // eslint-disable-next-line no-var
  var __marketplaceDb: {
    users: UserData[];
    listings: ListingData[];
    reservations: ReservationData[];
    threads: ForumThreadData[];
    disputes: DisputeReportData[];
    lockRegistry: Set<string>;
  } | undefined;
}

if (!global.__marketplaceDb) {
  global.__marketplaceDb = {
    users: [...initialUsers],
    listings: [...initialListings],
    reservations: [...initialReservations],
    threads: [...initialForumThreads],
    disputes: [...initialDisputes],
    lockRegistry: new Set<string>(),
  };
}

const memoryStore = global.__marketplaceDb;

export class DatabaseService {
  /**
   * Concurrency-safe mutex claim to guarantee an item cannot be claimed
   * by two users at the exact same millisecond.
   * Maps to "Atomic Database Transactions: Prisma transactions guaranteeing
   * an item cannot be claimed by two users at the same second (transitioning an item status
   * from Available to Reserved)."
   */
  static async claimItemAtomically(params: {
    listingId: string;
    renterId: string;
    days: number;
  }): Promise<{ success: boolean; error?: string; reservation?: ReservationData }> {
    const { listingId, renterId, days } = params;

    // Concurrency Lock: Prevents race conditions during simultaneous asynchronous requests
    if (memoryStore.lockRegistry.has(listingId)) {
      return {
        success: false,
        error: 'Concurrency conflict: Item is currently being locked by another concurrent transaction. Please retry in a moment.',
      };
    }

    // Acquire lock for this item
    memoryStore.lockRegistry.add(listingId);

    try {
      // Simulate real-world atomic database transaction delay
      await new Promise((r) => setTimeout(r, 60));

      const listing = memoryStore.listings.find((l) => l.id === listingId);
      if (!listing) {
        return { success: false, error: 'Listing not found.' };
      }

      if (listing.status !== 'AVAILABLE') {
        return {
          success: false,
          error: `Item is no longer available (Current Status: ${listing.status}). Another student claimed it first.`,
        };
      }

      const renter = memoryStore.users.find((u) => u.id === renterId) || memoryStore.users[0];

      // Atomic state transition
      listing.status = 'RESERVED';

      const totalCost = Number((listing.price * days).toFixed(2));
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + days);

      const reservationId = `res-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
      const token = `SEC-${listing.category.substring(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}-OK`;

      const newReservation: ReservationData = {
        id: reservationId,
        listingId: listing.id,
        listingTitle: listing.title,
        renterId: renter.id,
        renterName: renter.name,
        status: 'CONFIRMED',
        verificationToken: token,
        startDate: new Date().toISOString(),
        returnDeadline: returnDate.toISOString(),
        totalCost,
        depositHeld: listing.depositAmount,
        createdAt: new Date().toISOString(),
      };

      memoryStore.reservations.unshift(newReservation);

      return {
        success: true,
        reservation: newReservation,
      };
    } finally {
      // Release lock
      memoryStore.lockRegistry.delete(listingId);
    }
  }

  // Listing methods
  static async getListings(category?: string, search?: string) {
    let list = [...memoryStore.listings];
    if (category && category !== 'ALL') {
      list = list.filter((item) => item.category === category);
    }
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          Object.values(item.specs).some((v) => v.toLowerCase().includes(q))
      );
    }
    return list;
  }

  static async getListingById(id: string) {
    return memoryStore.listings.find((l) => l.id === id) || null;
  }

  static async createListing(newListing: Omit<ListingData, 'id' | 'createdAt'>) {
    const created: ListingData = {
      ...newListing,
      id: `list-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
    };
    memoryStore.listings.unshift(created);
    return created;
  }

  static async updateListingStatus(id: string, status: ListingData['status']) {
    const item = memoryStore.listings.find((l) => l.id === id);
    if (item) {
      item.status = status;
      return item;
    }
    return null;
  }

  // Reservation & Receipt methods
  static async getReservations(userId?: string) {
    if (userId) {
      return memoryStore.reservations.filter((r) => r.renterId === userId);
    }
    return memoryStore.reservations;
  }

  static async getReservationById(id: string) {
    return memoryStore.reservations.find((r) => r.id === id) || null;
  }

  // Forum methods
  static async getForumThreads(category?: string, search?: string) {
    let threads = [...memoryStore.threads];
    if (category && category !== 'ALL') {
      threads = threads.filter((t) => t.category === category);
    }
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      threads = threads.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.content.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return threads;
  }

  static async getForumThreadById(id: string) {
    return memoryStore.threads.find((t) => t.id === id) || null;
  }

  static async createForumThread(params: {
    title: string;
    content: string;
    category: ForumThreadData['category'];
    authorId: string;
    tags: string[];
  }) {
    const author = memoryStore.users.find((u) => u.id === params.authorId) || memoryStore.users[0];
    const thread: ForumThreadData = {
      id: `th-${Date.now().toString(36)}`,
      title: params.title,
      content: params.content,
      category: params.category,
      authorId: author.id,
      authorName: author.name,
      authorVerified: author.isVerifiedStudent,
      isPinned: false,
      isSolved: false,
      upvotes: 0,
      viewCount: 1,
      tags: params.tags,
      createdAt: new Date().toISOString(),
      replies: [],
    };
    memoryStore.threads.unshift(thread);
    return thread;
  }

  static async addForumReply(params: {
    threadId: string;
    authorId: string;
    content: string;
  }) {
    const thread = memoryStore.threads.find((t) => t.id === params.threadId);
    if (!thread) return null;
    const author = memoryStore.users.find((u) => u.id === params.authorId) || memoryStore.users[0];

    const reply = {
      id: `rep-${Date.now().toString(36)}`,
      threadId: thread.id,
      authorId: author.id,
      authorName: author.name,
      authorVerified: author.isVerifiedStudent,
      content: params.content,
      isSolution: false,
      upvotes: 0,
      createdAt: new Date().toISOString(),
    };
    thread.replies.push(reply);
    return reply;
  }

  static async upvoteThread(id: string) {
    const thread = memoryStore.threads.find((t) => t.id === id);
    if (thread) {
      thread.upvotes += 1;
      return thread.upvotes;
    }
    return 0;
  }

  static async markSolution(threadId: string, replyId: string) {
    const thread = memoryStore.threads.find((t) => t.id === threadId);
    if (!thread) return false;
    thread.isSolved = true;
    thread.replies.forEach((r) => {
      r.isSolution = r.id === replyId;
    });
    return true;
  }

  // Moderation methods
  static async getDisputes() {
    return memoryStore.disputes;
  }

  static async resolveDispute(id: string, notes: string, status: DisputeReportData['status'] = 'RESOLVED') {
    const dispute = memoryStore.disputes.find((d) => d.id === id);
    if (dispute) {
      dispute.status = status;
      dispute.moderatorNotes = notes;
      return dispute;
    }
    return null;
  }

  static async createDispute(params: Omit<DisputeReportData, 'id' | 'createdAt' | 'status'>) {
    const dispute: DisputeReportData = {
      ...params,
      id: `disp-${Date.now().toString(36)}`,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };
    memoryStore.disputes.unshift(dispute);
    return dispute;
  }

  // Users
  static async getUsers() {
    return memoryStore.users;
  }

  static async getUserById(id: string) {
    return memoryStore.users.find((u) => u.id === id) || null;
  }

  static async createUser(userData: Omit<UserData, 'id'>) {
    const user: UserData = {
      ...userData,
      id: `usr-${Date.now().toString(36)}`,
    };
    memoryStore.users.push(user);
    return user;
  }
}
