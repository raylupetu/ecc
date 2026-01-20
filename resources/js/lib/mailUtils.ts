/**
 * Utility to protect email addresses from simple spambots
 * and handle direct redirection to Gmail Compose.
 */

export const encodeEmail = (email: string): string => {
    return btoa(email);
};

export const decodeEmail = (encoded: string): string => {
    try {
        return atob(encoded);
    } catch (e) {
        return encoded;
    }
};

/**
 * Opens a direct Gmail compose window for the given email.
 * If the email is encoded (Base64), it decodes it first.
 */
export const handleGmailClick = (e: React.MouseEvent, email: string, isEncoded = true) => {
    e.preventDefault();
    const targetEmail = isEncoded ? decodeEmail(email) : email;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
};
