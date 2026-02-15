/** Injects form context (schema, state, form ref) from parent Form */
export const useModalForm = () =>
  inject<{ schema: object, state: Record<string, unknown>, form: unknown }>('val-modal-save')
