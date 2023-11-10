// ==UserScript==
// @name         IMS Shortcut Displayer
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Displays a list of keyboard shortcuts
// @author       JoeyCorbett
// @author       TylerMong
// @match        https://ims.stockton.edu/*
// @grant        none
// ==/UserScript==

(function()
{
    'use strict';

    let textElement = null;
    const customText = ["Ctrl + Enter = Resolve/Re-Open Ticket",
        "Alt + Enter = Park Ticket",
        "Ctrl + I = Go to Issues/Back to Active Issues",
        "Alt + N = New Issue",
        "Alt + C = Create Issue",
        "Alt + S = Search",
        "Ctrl + \ = Select Comment Box",
        "Esc = Show/Hide Shortcuts"];
    const targetClass = "css-my7rni";

    function displayText()
    {
        if (textElement)
        {
            textElement.remove();
            textElement = null;
        }
        else
        {
            const targetElements = document.getElementsByClassName(targetClass);
            if (targetElements.length > 0)
            {
                const targetElement = targetElements[0];
                textElement = document.createElement("div");
                textElement.innerHTML = customText.join("<br>");
                textElement.style.fontFamily = "Roboto, Helvetica, Arial, sans-serif;";
                textElement.style.fontWeight = "400";
                textElement.style.fontSize = "14px";
                targetElement.appendChild(textElement);
            }
        }
    }

    document.addEventListener("keydown", function(event)
    {
        if (event.key === "Escape")
            displayText();
    });
})();

// This will eventually end up in the GUI.js file