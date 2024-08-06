

import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="terms-of-service p-36">
      <div><strong className="text-blue-950">{t('terms.title')}</strong></div>
      <p>{t('terms.introduction')}</p>
      <ol>
        <li>
          <strong>{t('terms.hassleFreeReturnTitle')}</strong>
          <p>{t('terms.hassleFreeReturnDescription')}</p>
        </li>
        <li>
          <strong>{t('terms.returnForProblemsTitle')}</strong>
          <p>{t('terms.returnForProblemsDescription')}</p>
        </li>
        <li>
          <strong>{t('terms.orderNotReceivedTitle')}</strong>
          <p>{t('terms.orderNotReceivedDescription')}</p>
        </li>
        <li>
          <strong>{t('terms.returnProcessTitle')}</strong>
          <p>{t('terms.returnProcessDescription')}</p>
        </li>
        <li>
          <strong>{t('terms.nonReturnableProductsTitle')}</strong>
          <p>{t('terms.nonReturnableProductsDescription')}</p>
        </li>
        <li>
          <strong>{t('terms.couponRefundsTitle')}</strong>
          <p>{t('terms.couponRefundsDescription')}</p>
        </li>
        <li>
          <strong>{t('terms.refundsTitle')}</strong>
          <p>{t('terms.refundsDescription')}</p>
        </li>
        <li>
          <strong>{t('terms.currentLimitationsTitle')}</strong>
          <p>{t('terms.currentLimitationsDescription')}</p>
        </li>
      </ol>
      <p>{t('terms.guidelines')}</p>
      <p>{t('terms.thankYou')}</p>
    </div>
  );
};

export default TermsOfService;
