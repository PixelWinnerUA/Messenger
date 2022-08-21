import {Store} from 'redux';

declare module '*.png';
declare module '*.jpg';
declare module 'platform'
declare global {
    interface Window {
        store: Store;
    }
}