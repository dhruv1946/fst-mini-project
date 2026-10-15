'use server';

import { DatabaseService } from '@/app/lib/db';
import { getCurrentUser } from '@/app/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createThreadAction(formData: FormData) {
  const title = String(formData.get('title') || '').trim();
  const content = String(formData.get('content') || '').trim();
  const category = (formData.get('category') || 'GENERAL') as any;
  const tagsString = String(formData.get('tags') || '');
  const tags = tagsString
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  if (!title || !content) {
    return;
  }

  let user = await getCurrentUser();
  if (!user) {
    user = {
      id: 'usr-student-guest',
      name: 'Campus Student',
      email: 'student@campus.edu',
      studentId: 'ENG-2024-GUEST',
      university: 'Institute of Engineering & Tech',
      department: 'Engineering Department',
      role: 'STUDENT',
      isVerifiedStudent: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      trustRating: 4.9,
    };
  }

  const thread = await DatabaseService.createForumThread({
    title,
    content,
    category,
    authorId: user.id,
    authorName: user.name,
    tags: tags.length > 0 ? tags : ['General', 'Hardware'],
  });

  revalidatePath('/forum');
  redirect(`/forum/${thread.id}`);
}

export async function addReplyAction(formData: FormData) {
  const threadId = String(formData.get('threadId'));
  const content = String(formData.get('content') || '').trim();

  if (!threadId || !content) {
    return;
  }

  let user = await getCurrentUser();
  if (!user) {
    user = {
      id: 'usr-student-guest',
      name: 'Campus Student',
      email: 'student@campus.edu',
      studentId: 'ENG-2024-GUEST',
      university: 'Institute of Engineering & Tech',
      department: 'Engineering Department',
      role: 'STUDENT',
      isVerifiedStudent: true,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      trustRating: 4.9,
    };
  }

  await DatabaseService.addForumReply({
    threadId,
    authorId: user.id,
    authorName: user.name,
    content,
  });

  revalidatePath(`/forum/${threadId}`);
  revalidatePath('/forum');
}

export async function upvoteThreadAction(threadId: string) {
  await DatabaseService.upvoteThread(threadId);
  revalidatePath(`/forum/${threadId}`);
  revalidatePath('/forum');
}

export async function markSolutionAction(threadId: string, replyId: string) {
  await DatabaseService.markSolution(threadId, replyId);
  revalidatePath(`/forum/${threadId}`);
  revalidatePath('/forum');
}
