import TranslatedPolicyPage from './_components/TranslatedPolicyPage';
import { ROUTES } from '../../config/routes';

export default function CookiePolicyPage() {
  return <TranslatedPolicyPage namespace="policy-cookies" path={ROUTES.POLICY_COOKIES} />;
}
