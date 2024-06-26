import React, { useEffect } from 'react';

const DialogflowMessenger = () => {
    useEffect(() => {
        const scriptId = 'dialogflow-script';

        const appendScript = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.id = scriptId;
                script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        const initializeDfMessenger = async () => {
            if (!window.customElements.get('df-messenger')) {
                try {
                    await appendScript();
                } catch (error) {
                    console.error('Failed to load Dialogflow Messenger script:', error);
                }
            }
        };

        initializeDfMessenger();

        return () => {
            const script = document.getElementById(scriptId);
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <df-messenger
            intent="WELCOME"
            chat-title="Chat_web"
            agent-id="7be83072-e540-446b-b1f6-20efa66234d0"
            language-code="vi"
        ></df-messenger>
    );
};

export default DialogflowMessenger;
