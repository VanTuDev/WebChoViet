import TranslatedPolicyPage from './_components/TranslatedPolicyPage';
import { ROUTES } from '../../config/routes';

export default function RefundPolicyPage() {
  return <TranslatedPolicyPage namespace="policy-refund" path={ROUTES.POLICY_REFUND} />;
}
