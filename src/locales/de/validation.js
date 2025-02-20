export default {
    validation: {
        email: {
            required: "E-Mail-Adresse eingeben",
            invalid: "Gib eine gültige E-Mail-Adresse ein"
        },
        firstName: "Gib einen Vornamen ein",
        lastName: "Gib einen Nachnamen ein",
        address: "Gib eine Adresse ein",
        land: "Gib ein Land ein",
        zip: "Gib eine Postleitzahl ein",
        phone: "Format nicht verfügbar",
        city: "Gib eine Stadt ein",
        error: "Ein Fehler aufgetreten"
    },
    api: {
        post: {
            success: "{resource} wurde erfolgreich gespeichert",
            error: "Fehler beim Erstellen von {resource}"
        },
        delete: {
            cancel: "Löschen {resource} Storniert",
            confirm: "Sind Sie sicher, dass Sie löschen möchten {resource}",
            success: "{resource} wurde erfolgreich gelöscht",
            error: "Fehler beim Löschen von {resource}"
        },
        get: {
            success: "{resource} wurde erfolgreich abgerufen",
            error: "Fehler beim Abrufen von {resource}"
        },
        put: {
            success: "{resource} wurde erfolgreich aktualisiert",
            error: "Fehler beim Aktualisieren von {resource}"
        },
        error: "Ein Fehler ist aufgetreten"
    },
    error: {
        notFound: "404",
        message: "Die gesuchte Seite konnte nicht gefunden werden. Bitte nutzen Sie die Navigation oder den Button unten, um zu unserer Website zurückzukehren.",
        continueShopping: "weiter einkaufen",
        getProducts: "Fehler laden Produkte"
    },
    success: {
        title: "Zahlung abgeschlossen!",
        thankYou: "Vielen Dank für Ihre sichere Online-Zahlung.",
        checkEmail: "Sie können Ihre E-Mails überprüfen, um weitere Informationen zu Ihrer Bestellung zu erhalten."
    },
};
