import {  DirectiveBinding } from 'vue';

export default {
    mounted(el:HTMLElement, binding:DirectiveBinding) {
        const { value } = binding
        if(!value || !el) return
        el?.parentNode?.removeChild(el)
    }
}
