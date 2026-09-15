const itemPrice = document.getElementById("itemPrice")
const itemNameDisplay = document.getElementById("itemName")
const paymentReceived = document.getElementById("paymentReceived")
const quantityR = document.getElementById("quantity")
const changeZ = document.getElementById("changeZ")
const sellButton = document.getElementById("buttonSell")


const itemListFrame = document.getElementById("itemListFrame")

const APIURL = "https://script.google.com/macros/s/AKfycbylloK40pJxijL9SCKLsuQL7oren-M61MGQcnc6Ds_AfY51JPOKX1FboHecZb06W10/exec"
let inpN = "";
let inpQ = "";
let inpR = "";

let prisez = 0;

function calculateChange()
    {
        const change = Number(paymentReceived.value)-Number(itemPrice.value);

        changeZ.textContent = `CHANGE: ${change}`;
    } 

itemPrice.addEventListener("input", calculateChange);
paymentReceived.addEventListener("input", calculateChange);


async function loadItems() 
{
    const response = await fetch(APIURL);
    const data = await response.json();
    
    itemListFrame.innerHTML = "";

    for (let i = 1; i < data.length; i++) 
        {
            const itemName = data[i][0];
            const price = data[i][1];
            const initialStock = data[i][2];
            const itemSold = data[i][3];
            const itemStock = data[i][4];
            const itemRev = data[i][5];

            const item = document.createElement('button');

            item.textContent = `${itemName}:₱${price} Stock:${itemStock}`;

            itemListFrame.appendChild(item);

            item.addEventListener("click", function() 
            {
                itemNameDisplay.textContent = itemName;
                itemPrice.value = price;
                inpN = itemName;
            })
        }

    console.log(data);
}

loadItems();

async function sellItem(item, quantity, revenue) 
{
    try 
    {
        const response = await fetch(APIURL, 
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        item: item,
                        quantity: quantity,
                        revenue: revenue
                    })
            });

            const result = await response.json();

            if (result.success) 
                {
                    alert
                    (
                        `Sale recorderd!\nRemaining Stock: ${result.remainingStock}`
                    );
                } else {
                    alert(result.message);
                }
    } catch (error) 
    {
        console.error(error);
        alrt("CANT CONNETSADFASF");
    }
}

sellButton.addEventListener("click", function() 
{

    prisez = itemPrice.value;

    inpQ = Number(quantityR.value);
    inpR = Number(paymentReceived.value) * inpQ;

    if (inpQ * prisez > inpR) return;

    sellItem(inpN, inpQ, inpR)

    loadItems();
});