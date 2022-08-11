import { Store } from '@/store';// path to store file

export declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store;
    }
}
