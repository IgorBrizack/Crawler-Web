import requests as _requests
from requests.exceptions import ReadTimeout, ConnectionError, HTTPError
import bs4 as _bs4
import time

# https://lista.mercadolivre.com.br/geladeira#D[A:geladeira]
# https://www.buscape.com.br/search?q=geladeira


def fetch(url: str):
    try:
        page = _requests.get(url, headers={"user-agent": "Fake user-agent"})
        page.raise_for_status()
    except (ReadTimeout, ConnectionError, HTTPError):
        return None

    return page.text


def generate_url(web_site: str, product: str):
    if web_site == "mercadolivre":
        url = f"https://lista.mercadolivre.com.br/{product}#D[A:{product}]"
        return url
    else:
        url = f"https://www.buscape.com.br/search?q={product}"
        return url


def scrape_meli_products(url, type):
    html_content = fetch(url)
    content_parser = _bs4.BeautifulSoup(html_content, "html.parser")
    result = content_parser.find_all(
        "li", class_="ui-search-layout__item shops__layout-item"
    )

    list_of_products_data = []

    for product in result:
        product_dict = {
            "website": "Mercado Livre",
            "product_type": type,
            "description": str(
                product.find(
                    "h2", class_="ui-search-item__title shops__item-title"
                ).text
            ),
            "image_link": str(
                product.div.div.div.a.div.div.div.div.div.img["data-src"]
            ),
            "price": "R$ "
            + (
                (
                    str(
                        product.find(
                            "span",
                            class_="price-tag ui-search-price__part shops__price-part",
                        ).text,
                    )
                ).split(" ")
            )[0],
            "external_link": str((product).find("a", class_="ui-search-link")["href"]),
        }

        list_of_products_data.append(product_dict)

    return list_of_products_data


def scrape_buscape_products(url, type):
    class_text = "Paper_Paper__HIHv0 Paper_Paper__bordered__iuU_5 Card_Card__LsorJ Card_Card__clicable__5y__P SearchCard_ProductCard__1D3ve"
    html_content = fetch(url)
    content_parser = _bs4.BeautifulSoup(html_content, "html.parser")
    result = content_parser.find_all("div", class_={class_text})

    list_of_products_data = []

    for product in result:
        product_dict = {
            "website": "Busca Pé",
            "product_type": type,
            "description": str(
                product.find("h2", {"data-testid": "product-card::name"}).text
            ),
            "image_link": str(product.find("img", {"data-nimg": "fill"})["src"]),
            "price": str(
                product.find("p", {"data-testid": "product-card::price"}).text
            ),
            "external_link": str(
                product.find("a", {"data-testid": "product-card::card"})["href"]
            ),
        }

        list_of_products_data.append(product_dict)

    return list_of_products_data


def manage_scrape(website: str, product: str):
    main_url = generate_url(website, product)
    if website == "mercadolivre":
        return scrape_meli_products(main_url, product)
    else:
        return scrape_buscape_products(main_url, product)