import { defineApiDescription } from "~/modules/page-config/runtime";

export default defineApiDescription({
  props: {
    closeOnContentClick: "Dropdown will be closed when clicked inside dropdown content",
    hoverOutTimeout: "Time in `ms` after mouse leave dropdown before it will be closed",
    hoverOverTimeout: "Time in `ms` after mouse enter dropdown before it will be opened",
    verticalScrollOnOverflow: "If true, dropdown content will adjust its height when the content is larger than available space",
    keepAnchorWidth: "If true, dropdown content will have exact same width as anchor",
    offset: "Dropdown content will be moved by main and cross axis according to current `placement`",
    placement: "Dropdown content will be placed on `placement` side of anchor",
    trigger: "Action that will triggered when open and close dropdown.",
    target: "Dropdown content parent. Dropdown content will be attached to `target` to prevent overflow",
    closeOnAnchorClick:"Dropdown will be closed when anchor is clicked",
    ariaLabel: "The aria-label of the component",
    role: "The `role` attribute applied to the anchor"
  },
  events: {
    anchorClick: "The event is triggered when anchor is clicked",
    clickOutside: "The event is triggered when clicked outside dropdown content and anchor",
    contentClick: "The event is triggered when clicked inside dropdown content"
  },
  slots: {
    anchor: "Slot for anchor. When anchor is clicked, dropdown will be opened",
    default: "Dropdown content",
  }
});
