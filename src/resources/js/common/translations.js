import { I18n } from 'react-i18nify';
import enJson from '../../lang/en.json';


export default class Translations {
    init() {
        const translation = () => ({
            en: enJson,
        });

        const missingTranslationHandle = key => `Missing translation: ${key}`;
        I18n.setHandleMissingTranslation(missingTranslationHandle);
        I18n.setTranslationsGetter(translation);
    }
}
