export default {
    error: {
        notFound: "404",
        message: "We could not find the page you were looking for. Please use the navigation or the button below to go back to our website.",
        continueShopping: "continue shopping"
    },
    validation: {
        email: {
            required: "Please enter an email address",
            invalid: "Enter a valid email address"
        },
        firstName: "Please enter a first name",
        lastName: "Please enter a last name",
        address: "Please enter an address",
        land: "Please select a country",
        zip: "Please enter a zip code",
        phone: "Format not available",
        city: "Please enter a city",
        error: "An error occurred"
    },
    success: {
        title: "Payment Done!",
        thankYou: "Thank you for completing your secure online payment.",
        checkEmail: "You can check your email for more info about your order."
    },
    api: {
        get: {
            success: "{resource} retrieved successfully",
            error: "Failed to get {resource}"
        },
        post: {
            success: "{resource} created successfully",
            error: "Failed to create {resource}"
        },
        put: {
            success: "{resource} updated successfully",
            error: "Failed to update {resource}"
        },
        delete: {
            cancel: "Delete {resource} cancelled",
            confirm: "Are you sure you want to delete {resource}",
            success: "{resource} deleted successfully",
            error: "Failed to delete {resource}"
        },
        error: "An error occurred"
    }
};
