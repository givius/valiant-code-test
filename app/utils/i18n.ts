import { useI18n } from 'vue-i18n'

/** Translates key if it exists, otherwise returns the key as-is */
export const appT = (key?: string | null, vals: Record<string, unknown> = {}) => {
  const { te, t } = useI18n()
  return key && te(key) ? t(key, vals) : key || ''
}
