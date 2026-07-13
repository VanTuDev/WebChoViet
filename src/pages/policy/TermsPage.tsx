import TranslatedPolicyPage from './_components/TranslatedPolicyPage';
import { ROUTES } from '../../config/routes';

export default function TermsPage() {
  return <TranslatedPolicyPage namespace="policy-terms" path={ROUTES.POLICY_TERMS} />;
}
