/**
 * Tipos del dominio CV.
 *
 * Derivado de: xthecapx/cv-generator (apps/components/src/types.ts)
 * Copyright (c) xthecapx — Licensed under GPL-3.0 (ver /LICENSE)
 */
export interface ContactInfo {
	name: string;
	title: string;
	phone: string;
	email: string;
	/** Original markdown label of the phone field (e.g. "Teléfono"); renderer falls back to "Phone" */
	phoneLabel?: string;
	/** Original markdown label of the email field (e.g. "Correo"); renderer falls back to "Email" */
	emailLabel?: string;
	location: string;
	/** Original markdown label of the location field (e.g. "Ubicación"); renderer falls back to "Location" */
	locationLabel?: string;
	links: Array<{
		text: string;
		url: string;
	}>;
	/**
	 * Campos de contacto no reconocidos (cualquier otra clave `clave: valor`).
	 * Se conservan para que el formateo (cvToMarkdown) no los pierda.
	 */
	other: Array<{
		key: string;
		value: string;
	}>;
}

/**
 * Línea de detalle de una entrada: una viñeta (`-`, `*`, `+`), una línea de
 * lista numerada (`1.`, `2)`) o texto plano (sin marcador).
 *
 * `marker` guarda el prefijo original **tal cual** para que el formateo no
 * convierta las listas numeradas en viñetas ni reescriba `*` como `-`, y para
 * que el PDF pinte el número que el usuario escribió.
 */
export interface CvDetail {
	text: string;
	/** Marcador de lista original (p. ej. `-`, `*`, `3.`); ausente = texto plano. */
	marker?: string;
}

export interface CvItem {
	primary?: string;
	primaryRight?: string;
	secondary?: string;
	secondaryRight?: string;
	details: CvDetail[];
	/**
	 * Ítem de párrafo: nace de texto suelto (sin `###` ni viñeta). Las viñetas
	 * que lleguen después abren una entrada nueva en vez de colarse aquí.
	 */
	plain?: boolean;
	break?: boolean;
}

export interface CvSection {
	title: string;
	items: CvItem[];
	break?: boolean;
	/**
	 * Sección sin título: agrupa el contenido que aparece **antes** del primer
	 * `##` (el PDF no pinta cabecera y `cvToMarkdown` no escribe el `##`).
	 * En la práctica sólo la crea el parser; el usuario nunca la escribe.
	 */
	preamble?: boolean;
}

export interface CvProperties {
	[key: string]: string | string[] | undefined;
}

export interface CvData {
	properties?: CvProperties;
	contact: ContactInfo;
	sections: CvSection[];
}
