const endpoints = require( "./endpoints.js");

const adresserJSON = require( "./jsonTemplates/adresser.js");
const arbeidJSON = require( "./jsonTemplates/arbeid.js");
const brukerprofilJSON = require( "./jsonTemplates/brukerprofil.js");
const familieJSON = require( "./jsonTemplates/familie.js");
const norgJSON = require( "./jsonTemplates/norg.js");
const organisasjonJSON = require( "./jsonTemplates/organisasjon.js");
const telefonJSON = require( "./jsonTemplates/telefon.js");
const utbetalingJSON = require( "./jsonTemplates/utbetaling.js");

const midlertidigPostadresseJSON = require( "./jsonPartialTemplates/midlertidigPostadresse.js");


const adresser = adresserJSON;
let arbeid = arbeidJSON;
const brukerprofil = brukerprofilJSON;
const familie = familieJSON;
const norg = norgJSON;
let organisasjon = organisasjonJSON;
const telefon = telefonJSON;
const utbetaling = utbetalingJSON;

const midlertidigPostadresse = midlertidigPostadresseJSON;

const PERSON = "person";
const MIDLERTIDIGPOSTADRESSE = "midlertidigPostadresse";
const BANKKONTO = "bankkonto";
const VERDI = "verdi";
const ARBEIDSFORHOLD = "arbeidsforhold";
const ORGANISASJON = "organisasjon";
const PERSONNAVN= "personnavn";



module.exports = {

	settNavn : (fornavn, mellomnavn, etternavn) => {
		const navnObject =
		{
			"etternavn": etternavn,
			"fornavn": fornavn,
			"mellomnavn": mellomnavn,
			"sammensattNavn": null,
			"endringstidspunkt": null,
			"endretAv": null,
			"endringstype": null
		};

		familie[PERSONNAVN] = navnObject;
	},

	settMidlertidigPostadresse : (midlertidigPostadresseEgendefinertValue) => {
		brukerprofil[PERSON][MIDLERTIDIGPOSTADRESSE] = midlertidigPostadresseJSON;
	},

	settTelefonnummer : (telefonnummer) => {
		if (typeof telefonnummer === "undefined") {
			throw new Error("Mangler telefonnummer (men det er lov å sette eksplisitt til null).")
		}
		telefon[VERDI] = telefonnummer;
	},

	settBankkontonummer : (bankkontonummer) => {

		if (bankkontonummer !== null){
			brukerprofil[PERSON][BANKKONTO] = { "bankkonto" : { "bankkontonummer": bankkontonummer} }
		} else {
			brukerprofil[PERSON][BANKKONTO] = null;
		}
	},

	settArbeidsforholdMedArbeidsgivernummer : (startDato, sluttDato, stillingsProsent, arbeidsgiverNummer, arbeidsgiverNavn ) => {
		const nyttArbeidsForhold =
			{
				"arbeidsforholdIDnav" : 0,
				"ansettelsesPeriode" : {
					"periode" : {
						"fom" : startDato,
						"tom" : sluttDato
					}
				},
				"arbeidsavtale" : [ {
					"stillingsprosent" : parseInt(stillingsProsent, 10),
				} ],
				"arbeidsgiver" : {
					"arbeidsgivernummer": arbeidsgiverNummer,
					"navn": arbeidsgiverNavn
				}
			};
		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
	},

	settArbeidsforholdMedIdent : (startDato, sluttDato, stillingsProsent, ident ) => {
		const nyttArbeidsForhold =
			{
				"arbeidsforholdIDnav" : 0,
				"ansettelsesPeriode" : {
					"periode" : {
						"fom" : startDato,
						"tom" : sluttDato
					}
				},
				"arbeidsavtale" : [ {
					"stillingsprosent" : stillingsProsent
				} ],
				"arbeidsgiver" : {
					"ident": {
						"ident": ident
					}
				}
			};
		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
	},

	settArbeidsforholdMedOrganisasjonsnummer : ( startDato, sluttDato, stillingsProsent, orgnummer ) => {
		const nyttArbeidsForhold =
			{
				"arbeidsforholdIDnav" : 0,
				"ansettelsesPeriode" : {
					"periode" : {
						"fom" : startDato,
						"tom" : sluttDato
					}
				},
				"arbeidsavtale" : [ {
					"stillingsprosent" : stillingsProsent
				} ],
				"arbeidsgiver" : {
					"orgnummer" : orgnummer
				}
			};
		arbeid[ARBEIDSFORHOLD].push(nyttArbeidsForhold);
	},

	clearArbeidsforhold : () => {
		arbeid = arbeidJSON;
	},

	settOrganisasjon : ( orgnummer, navn ) => {
		organisasjon = organisasjonJSON;
        const nyOrganisasjon =
            {
                "orgnummer": orgnummer,
                "navn": {
                    "navnelinje": [
                        navn
                    ]
                },
                "organisasjonDetaljer": null,
                "bestaarAvOrgledd": [],
                "inngaarIJuridiskEnhet": [],
                "virksomhetDetaljer": null
            };
        organisasjon[ORGANISASJON] = nyOrganisasjon;
	},

	clearOrganisasjon : () => {
		organisasjon = null;
	},

    getAdresserPath : () => { return endpoints.adresser },
    getAdresserJson : () => { return adresser },
    getNorgPath : () => { return endpoints.norg },
    getNorgJson : () => { return norg },
    getTelefonPath : () => { return endpoints.telefon },
    getTelefonJson : () => { return telefon },
    getBrukerprofilPath : () => { return endpoints.brukerprofil },
    getBrukerprofilJson : () => { return brukerprofil },
    getArbeidPath : () => { return endpoints.arbeid },
    getArbeidJson : () => { return arbeid },
    getOrganisasjonPath : () => { return endpoints.organisasjon },
    getOrganisasjonJson : () => { return organisasjon },
    getFamiliePath : () => { return endpoints.familie },
    getFamilieJson : () => { return familie },
    getUtbetalingPath : () => { return endpoints.utbetaling },
    getUtbetalingJson : () => { return utbetaling },
};

