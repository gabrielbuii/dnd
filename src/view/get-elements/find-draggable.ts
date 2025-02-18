import type { DraggableId, ContextId } from '../../types';
import * as attributes from '../data-attributes';
import { queryElements } from '../../query-selector-all';
import { warning } from '../../dev-warning';
import isHtmlElement from '../is-type-of-element/is-html-element';

export default function findDraggable(
  contextId: ContextId,
  draggableId: DraggableId,
  ref: Node
): HTMLElement | null {
  // cannot create a selector with the draggable id as it might not be a valid attribute selector
  const selector = `[${attributes.draggable.contextId}="${contextId}"]`;
  const draggable = queryElements(
    ref,
    selector,
    (el: Element): boolean => {
      return el.getAttribute(attributes.draggable.id) === draggableId;
    },
  );

  if (!draggable) {
    return null;
  }

  if (!isHtmlElement(draggable)) {
    warning('Draggable element is not a HTMLElement');
    return null;
  }

  return draggable;
}
