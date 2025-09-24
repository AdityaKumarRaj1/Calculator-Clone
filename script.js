 document.addEventListener("DOMContentLoaded", () => {
      const input = document.querySelector(".inputbox input");
      const buttons = document.querySelectorAll(".calbutton button");

      let expr = ""; 
      // store karne ke liye niche dekh

      const isOperator = ch => ["+", "-", "*", "/", "%"].includes(ch);
      const lastChar = () => expr.slice(-1);
      const updateDisplay = v => input.value = v === "" ? "0" : v;

      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          const value = (btn.textContent || btn.innerText).trim();

          //sphachat karne ke liye
          if (value === "AC") {
            expr = "";
            updateDisplay(expr);
            return;
          }

           if (value === "Del") {
            expr = expr.slice(0, -1);
            updateDisplay(expr);
            return;
          }

          //brabar ke liye
          if (value === "=") {
            if (!expr) {
              updateDisplay("0");
              return;
            }
            while (expr && isOperator(lastChar())) expr = expr.slice(0, -1);

            try {
              // jor ghatao karne ke liye
              const result = Function('"use strict"; return (' + expr + ')')();
              expr = String(result);
              updateDisplay(expr);
            } catch (e) {
              expr = "";
              updateDisplay("Error");
            }
            return;
          }

          //.
          if (value === ".") {
            const parts = expr.split(/[\+\-\*\/%]/);
            const lastNum = parts[parts.length - 1];
            if (lastNum.includes(".")) return;
            if (lastNum === "") expr += "0";
            expr += ".";
            updateDisplay(expr);
            return;
          }

          // ye sab operater ka hai ji
          if (isOperator(value)) {
            if (!expr && value !== "-") return; 
            if (isOperator(lastChar())) {
              expr = expr.slice(0, -1) + value; 
            } else {
              expr += value;
            }
            updateDisplay(expr);
            return;
          }

        // ye sab number ka hai ji
          expr += value;
          updateDisplay(expr);
        });
      });

      updateDisplay(expr);
    });