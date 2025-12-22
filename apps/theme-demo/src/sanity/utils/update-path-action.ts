import { useDocumentOperation, DocumentActionProps } from 'sanity';
import { useState, useEffect } from 'react';

const defaultPageTypes = new Set(['page', 'homePage']);

export function UpdatePathFromSlugAction(
  props: DocumentActionProps,
  pageTypesSet = defaultPageTypes
) {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isUpdating, setIsUpdating] = useState(false);

  // Get the slug value from the draft or published document
  const draft = props.draft as { slug?: { current?: string } } | null;
  const published = props.published as { slug?: { current?: string } } | null;
  const slug = draft?.slug?.current || published?.slug?.current;
  const type = props.type;

  const buildPath = () => {
    if (type === 'homePage') {
      return '/';
    }
    return `/${slug || ''}`;
  };

  useEffect(() => {
    if (isUpdating && !draft) {
      setIsUpdating(false);
    }
  }, [draft, isUpdating]);

  return {
    label: isUpdating ? 'Publishing…' : 'Publish',
    disabled: !slug,
    onHandle: () => {
      if (!pageTypesSet.has(type)) {
        publish.execute();
        return;
      }
      setIsUpdating(true);
      // Update the 'path' field based on the 'slug' field
      patch.execute([{ set: { path: buildPath() } }]);
      // Perform the publish
      publish.execute();
    },
  };
}
