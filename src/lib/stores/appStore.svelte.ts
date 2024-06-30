import { SvelteComponent } from 'svelte';
import EditTemplate from '../pages/EditTemplate.svelte';
import EditTemplateGroup from '../pages/EditTemplateGroup.svelte';
import List from '../pages/List.svelte';
import type { UUID } from '../types';

type AppOrigin = 'popup';

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
  let appOrigin: AppOrigin | undefined = $state();
  let editTemplatePageProps: EditTemplatePageProps | undefined = $state();
  let editTemplateGroupPageProps: EditTemplateGroupPageProps | undefined =
    $state();
  let Page = $derived(ROUTES_COMPONENT[activeRoute]);


  const scrollUp = () => {
    window.scrollTo({
      top: 0
    })
  }

  return {
    get appOrigin(): AppOrigin | undefined {
      return appOrigin;
    },

    get activeRoute() {
      return activeRoute;
    },

    get editPageTemplateProps() {
      return editTemplatePageProps;
    },

    get editPageTemplateGroupProps() {
      return editTemplateGroupPageProps;
    },

    set appOrigin(value: AppOrigin) {
      appOrigin = value;
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
      scrollUp()
    },

    renderEditTemplateGroupPage: (pageProps?: EditTemplateGroupPageProps) => {
      activeRoute = 'editTemplateGroup';
      if (pageProps) editTemplateGroupPageProps = pageProps;
      scrollUp()
    },

    renderListPage: () => {
      activeRoute = 'list';
    },
  };
};

export const appStore = initAppStore();
