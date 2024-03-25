import './app.css';
import { mount } from 'svelte';
import App from './PopupApp.svelte';

// @ts-ignore
const app = mount(App, { target: document.getElementById('app') });

export default app;
