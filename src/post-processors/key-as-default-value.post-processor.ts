import {TranslationCollection, TranslationInterface} from '../utils/translation.collection.js';
import { PostProcessorInterface } from './post-processor.interface.js';

export class KeyAsDefaultValuePostProcessor implements PostProcessorInterface {
	public name: string = 'KeyAsDefaultValue';

	public process(draft: TranslationCollection, extracted: TranslationCollection, existing: TranslationCollection): TranslationCollection {
		return draft.map((key: string, val: TranslationInterface): TranslationInterface => val.value === '' && !existing.has(key) ? {value: key, sourceFiles: (val?.sourceFiles || [])} : val);
	}
}
