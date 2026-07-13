import TranslatedPolicyPage from './_components/TranslatedPolicyPage';
import { ROUTES } from '../../config/routes';

export default function PrivacyPolicyPage() {
  return <TranslatedPolicyPage namespace="policy-privacy" path={ROUTES.POLICY_PRIVACY} />;
}
