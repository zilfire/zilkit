import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { previewClient } from '../../../../lib/sanity.preview';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(previewClient, request.url);

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  redirect(redirectTo);
}
