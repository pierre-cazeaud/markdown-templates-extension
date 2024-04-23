import { SvelteComponent } from 'svelte';
import EditTemplate from '../pages/EditTemplate.svelte';
import EditTemplateGroup from '../pages/EditTemplateGroup.svelte';
import List from '../pages/List.svelte';
import type { UUID } from '../types';

type EditTemplatePageProps = {
  templateId: UUID;
};

type EditTemplateGroupPageProps = {
  templateGroupId: UUID;
};

type Routes = 'editTemplate' | 'editTemplateGroup' | 'list';

export const ROUTES_COMPONENT: Record<Routes, typeof SvelteComponent<any>> = {
  editTemplate: EditTemplate,
  editTemplateGroup: EditTemplateGroup,
  list: List,
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
