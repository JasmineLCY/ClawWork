import { defineAppSetup } from '@slidev/types';
import { t } from '../composables/i18n';
import '../composables/theme';
import '../themes/daocloud/theme.css';

export default defineAppSetup(({ app }) => {
  app.config.globalProperties.$t = t;
});
