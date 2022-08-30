import { Store } from '@/store';

export declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store;
    }
}
