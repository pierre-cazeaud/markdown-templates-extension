import { SvelteComponent } from 'svelte';

import EditPage from '../layouts/EditPage.svelte';
import EditTemplateGroupPage from '../layouts/EditTemplateGroupPage.svelte';
import ListPage from '../layouts/ListPage.svelte';
import { UUID } from '../types';

type EditTemplatePageProps = {
  templateId: UUID;
};

type EditTemplateGroupPageProps = {
  templateGroupId: UUID;
};

type Routes = 'editTemplate' | 'editTemplateGroup' | 'list';

export const ROUTES_COMPONENT: Record<Routes, typeof SvelteComponent<any>> = {
  editTemplate: EditPage,
  editTemplateGroup: EditTemplateGroupPage,
  list: ListPage,
};

const initAppStore = () => {
  let activeRoute: Routes = $state('list');
  let editTemplatePageProps: EditTemplatePageProps | undefined = $state();
  let editTemplateGroupPageProps: EditTemplateGroupPageProps | undefined =
    $state();
  let Page = $derived(ROUTES_COMPONENT[activeRoute]);

  return {
    get activeRoute() {
      return activeRoute;
    },

    get editPageTemplateProps() {
      return editTemplatePageProps;
    },

    get editPageTemplateGroupProps() {
      return editTemplateGroupPageProps;
    },

    set editPageTemplateProps(newValue) {
      editTemplatePageProps = newValue;
    },

    set editPageTemplateGroupProps(newValue) {
      editTemplateGroupPageProps = newValue;
    },

    get Page() {
      return Page;
    },

    renderEditTemplatePage: (pageProps?: EditTemplatePageProps) => {
      activeRoute = 'editTemplate';
      if (pageProps) editTemplatePageProps = pageProps;
    },

    renderEditTemplateGroupPage: (pageProps?: EditTemplateGroupPageProps) => {
      activeRoute = 'editTemplateGroup';
      if (pageProps) editTemplateGroupPageProps = pageProps;
    },

    renderListPage: () => {
      activeRoute = 'list';
    },
  };
};

export const appStore = initAppStore();
