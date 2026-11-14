/**
 * Fonte única da verdade para metadados legais (LGPD).
 *
 * Sempre que o texto da Política de Privacidade mudar de forma relevante,
 * incremente PRIVACY_POLICY_VERSION. Cada aceite gravado no Firestore guarda
 * a versão vigente, permitindo provar a qual texto o titular consentiu
 * (LGPD, Art. 8º, §2º — o ônus da prova é do controlador).
 */
export const PRIVACY_POLICY_VERSION = 'v1.0';
export const PRIVACY_POLICY_UPDATED_AT = '14/11/2026';

/** Rota pública da política (usada em routerLink e em links externos). */
export const PRIVACY_POLICY_ROUTE = '/privacidade';

/** Identificação do controlador e canal do titular (LGPD, Art. 9º, III e Art. 41). */
export const DATA_CONTROLLER = {
  name: 'Diego Marson',
  professionalId: 'CRP 06/133458',
  // TODO: confirmar se haverá um e-mail exclusivo para privacidade.
  privacyEmail: 'diegomarsonpsi@outlook.com'
} as const;
