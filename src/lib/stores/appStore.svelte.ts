import { SvelteComponent } from 'svelte';

import EditPage from '../layouts/EditPage.svelte';
import ListPage from '../layouts/ListPage.svelte';
import { UUID } from '../types';

type EditPageProps = {
  templateGroupId: string;
  templateId: UUID;
};

type Routes = 'edit' | 'list';

export const ROUTES_COMPONENT: Record<Routes, typeof SvelteComponent<any>> = {
  edit: EditPage,
  list: ListPage,
};

const initAppStore = () => {
  let activeRoute: Routes = $state('list');
  let editPageProps: EditPageProps | undefined = $state();
  let Page = $derived(ROUTES_COMPONENT[activeRoute]);

  return {
    get activeRoute() {
      return activeRoute;
    },

    get editPageTemplateProps() {
      return editPageProps;
    },

    get Page() {
      return Page;
    },

    renderEditPage: (pageProps?: EditPageProps) => {
      activeRoute = 'edit';
      if (pageProps) editPageProps = pageProps;
    },

    renderListPage: () => {
      activeRoute = 'list';
    },
  };
};

export const appStore = initAppStore();
