<template>
  <div class="example">
    <toolbar
      :config="config"
      :themes="Object.keys(themes)"
      :languages="Object.keys(languages)"
      @language="ensureLanguageCode"
    />
    <div class="divider"></div>
    <editor
      :config="config"
      :theme="currentTheme"
      :language="currentLangCode.language"
      :code="currentLangCode.code"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, shallowRef, onBeforeMount } from 'vue'
  import languages from './languages'
  import { oneDark } from "@codemirror/theme-one-dark";
  import Toolbar from './toolbar.vue'
  import Editor from './editor.vue'

  export default defineComponent({
    name: 'vue-codemirror-example',
    title: 'Example Source Code',
    url: import.meta.url,
    components: {
      Toolbar,
      Editor
    },
    setup() {
      const config = reactive({
        disabled: false,
        indentWithTab: true,
        tabSize: 2,
        autofocus: true,
        height: 'auto',
        language: 'javascript',
        theme: oneDark
      })

      const langCodeMap = reactive(new Map<string, { code: string; language: () => any }>())
      const currentLangCode = computed(() => langCodeMap.get(config.language)!)
      const currentTheme = computed(() => {
        return config.theme !== 'default' ? themes[config.theme] : void 0
      })

      const ensureLanguageCode = async (targetLanguage: string) => {
        config.language = targetLanguage
        const delayPromise = () => new Promise((resolve) => window.setTimeout(resolve, 260))
        if (langCodeMap.has(targetLanguage)) {
          await delayPromise()
        } else {
          const [result] = await Promise.all([languages[targetLanguage](), delayPromise()])
          langCodeMap.set(targetLanguage, result.default)
        }
      }

      // HACK: Make sure the first screen the user sees is the loading placeholder
      onBeforeMount(() => {
        // init default language & code
        ensureLanguageCode(config.language)
      })

      return {
        config,
        themes,
        languages,
        currentTheme,
        currentLangCode,
        ensureLanguageCode
      }
    }
  })
</script>