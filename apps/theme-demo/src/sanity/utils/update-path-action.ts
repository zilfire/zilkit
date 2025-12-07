import { useDocumentOperation } from 'sanity';
import { useState, useEffect } from 'react';

interface UpdatePathFromSlugActionProps {
  id: string;
  type: string;
  draft?: { slug?: { current?: string } };
  published?: { slug?: { current?: string } };
  onComplete: () => void;
}

const defaultPageTypes = new Set(['page', 'homePage']);

export function UpdatePathFromSlugAction(
  props: UpdatePathFromSlugActionProps,
  pageTypesSet = defaultPageTypes
) {
  const { patch, publish } = useDocumentOperation(props.id, props.type);
  const [isUpdating, setIsUpdating] = useState(false);

  // Get the slug value from the draft or published document
  const slug = props.draft?.slug?.current || props.published?.slug?.current;
  const type = props.type;

  useEffect(() => {
    if (isUpdating && !props.draft) {
      setIsUpdating(false);
    }
  }, [props.draft]);

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
      patch.execute([{ set: { path: `/${slug || ''}` } }]);
      // Perform the publish
      publish.execute();
    },
  };
}
