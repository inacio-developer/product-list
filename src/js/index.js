$(document).ready(() => {
  const products = [];

  // Events

  $(".btn-submit").click((click) => {
    click.preventDefault();
    if (
      $("#name").val() &&
      $("#descriptionProduct").val() &&
      $("#price").val()
    ) {
      addArray();

      if ($(".arrow-value-order").hasClass("trueOrder")) {
        deleteTable();
        orderValue();
        $(".table-products").removeClass("d-none");
        $(".inputDate").each((i, field) => $(field).val(""));
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  });

  $(".openList").click((click) => {
    click.preventDefault();
    $(".table-products").removeClass("d-none");
  });

  $([".offList", ".addProduct"]).each((index, element) =>
    $(element).click((click) => {
      click.preventDefault();
      $(".table-products").addClass("d-none");
    })
  );

  $(".order-name").click((click) => {
    click.preventDefault();

    if (!$(".arrow-name-order").hasClass("trueOrder")) {
      checkOrder();
      deleteTable();
      orderName();
    } else {
      $(".order-value").click();
    }
  });

  $(".order-value").click((click) => {
    click.preventDefault();

    if (!$(".arrow-value-order").hasClass("trueOrder")) {
      checkOrder();
      deleteTable();
      orderValue();
    } else {
      $(".order-name").click();
    }
  });

  // sorting methods

  const orderName = () => {
    const order = products.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    sortScreen(order);
  };

  const orderValue = () => {
    const order = products.sort((a, b) => {
      return a.price - b.price;
    });

    sortScreen(order);
  };

  const sortScreen = (array) => {
    array.forEach((product, i) => {
      const name = nameFormatted(product.name);
      const price = valueFormatted(product.price);

      const item = `<tr class="product"><th scope="row">${name}</th><td>R$${price}</td></tr>`;
      $(".table-body").append(item);
    });
  };

  // helper methods
  const addArray = () => {
    products.push({
      name: $("#name").val(),
      description: $("#descriptionProduct").val(),
      price: $("#price").val(),
      disponible: $("#optionYes")[0].checked == true ? true : false,
    });
  };

  const deleteTable = () => {
    $(".table-body").empty();
  };

  const nameFormatted = (name) => {
    let nameForm;

    if (name.length > 1) {
      nameForm =
        name[0].toUpperCase() + name.slice(1, name.length).toLowerCase();
    } else if (name.length - 1 == 1) {
      nameForm = name[0].toUpperCase() + name[1].toLowerCase();
    } else {
      nameForm = name.toUpperCase();
    }
    return nameForm;
  };

  const valueFormatted = (number) => {
    let value = 0;

    if (number.toString().includes(".") || number.toString().includes(",")) {
      const priceBefore = number
        .match(/\d+[.,]/g)
        .join(".")
        .replaceAll(".", "")
        .replaceAll(",", "");
      const priceAfter = number
        .match(/[.,]\d+/g)
        .join(".")
        .slice(0, 3)
        .replaceAll(".", "")
        .replaceAll(",", "");

      value = priceBefore + "." + priceAfter;
    } else {
      value = number + "." + "00";
    }

    return value;
  };

  const checkOrder = () => {
    if (
      $(".arrow-name-order").hasClass("trueOrder") &&
      !$(".arrow-value-order").hasClass("trueOrder")
    ) {
      $(".arrow-name-order")
        .css("transform", "rotate(0deg)")
        .removeClass("trueOrder");

      $(".arrow-value-order")
        .css("transform", "rotate(180deg)")
        .addClass("trueOrder");
    } else {
      $(".arrow-value-order")
        .removeClass("trueOrder")
        .css("transform", "rotate(0deg)");

      $(".arrow-name-order")
        .css("transform", "rotate(180deg)")
        .addClass("trueOrder");
    }
  };
});
