import type {DirectiveBinding} from "vue";

interface ExtendedHtmlElement extends HTMLElement {
  clickOutsideEvent: (event: MouseEvent) => void
}

export const VOutsideclick = {
  beforeMount(el: ExtendedHtmlElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = function(event: MouseEvent) {
      if (!(el === event.target || el.contains((event.target as HTMLElement)))) {
        binding.value(event);
      }
    };
    document.body.addEventListener('mouseup', el.clickOutsideEvent);
  },

  unmounted(el: ExtendedHtmlElement) {
    document.body.removeEventListener('mouseup', el.clickOutsideEvent);
  }
}
