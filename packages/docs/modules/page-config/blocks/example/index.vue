<script setup lang="ts">
import { DefineComponent, PropType, ref } from "vue";
import { type CodeSandboxConfig } from "../../../../composables/code-sandbox";
import { CodeView } from "../shared/code";
import ExampleFooter from "./example-footer.vue";
import Headline from "../headline/index.vue";
import Paragraph from "../paragraph/index.vue";

const props = defineProps({
  component: {
    type: Object as PropType<DefineComponent>,
    required: true,
  },
  source: {
    type: String as PropType<string>,
    required: true,
  },
  path: {
    type: String as PropType<string>,
    required: true,
  },
  title: {
    type: String as PropType<string>,
    default: "",
  },
  description: {
    type: String as PropType<string>,
    default: "",
  },
  hideCode: { type: Boolean, default: false },
  hideTitle: { type: Boolean, default: false },
  hideTemplate: { type: Boolean, default: false },
  forceShowCode: { type: Boolean, default: false },
  codesandboxConfig: {
    type: Object as PropType<CodeSandboxConfig>,
    default: () => ({}),
  },
  customCode: {
    type: Object as PropType<{
      source: string;
      lang: string;
    }>,
  },
});

const showCode = ref(false);

function parseTemplate(target: string, template: string) {
  const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`;
  const regex = new RegExp(string, "g");
  const parsed = regex.exec(template) || [];
  return parsed[1] || "";
}

const template = computed(() => parseTemplate("template", props.source));
const script = computed(() => parseTemplate("script", props.source));
const style = computed(() => parseTemplate("style", props.source));

// TODO: double check if path correct after release
const gitLink = computed(
  () =>
    `https://github.com/epicmaxco/vuestic-ui/tree/develop/packages/docs/${props.path}`
);

const sourceComputed = computed(() => props.customCode?.source || props.source);
</script>

<template>
  <template v-if="!hideTitle">
    <Headline
      v-if="title"
      :text="title"
    />
    <Paragraph
      v-if="description"
      :text="description"
    />
  </template>

  <div class="page-config-example">
    <VaCard
      outlined
      class="page-config-example__card"
      color="background-primary"
    >
      <VaCardContent>
        <component :is="component" />
      </VaCardContent>
    </VaCard>
    <ExampleFooter
      v-model:show-code="showCode"
      class="-mt-1"
      :code="sourceComputed"
      :git-link="gitLink"
      :hide-show-code-button="forceShowCode || hideCode"
    />

    <template v-if="(showCode && !hideCode) || forceShowCode">
      <div v-if="customCode">
        <CodeView
          :code="customCode.source"
          :language="customCode.lang"
        />
      </div>
      <div v-else>
        <CodeView
          v-if="template && !hideTemplate"
          language="html"
          :code="template"
        />
        <CodeView
          v-if="script"
          :code="script"
          language="html"
        />
        <CodeView
          v-if="style"
          :code="style"
          language="html"
        />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.page-config-example {
  margin-bottom: 2rem;

  &__card {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
