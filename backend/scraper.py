import requests as _requests
from requests.exceptions import ReadTimeout, ConnectionError, HTTPError
import bs4 as _bs4
import time

# https://lista.mercadolivre.com.br/geladeira#D[A:geladeira]
# https://www.buscape.com.br/search?q=geladeira

next_page_class_meli = "andes-pagination__link shops__pagination-link ui-search-link"

def scrape_next_page_link(html_content, web_site):
    bs_select_next = _bs4.BeautifulSoup(html_content, "html.parser")

    if web_site == 'mercadolivre':
        try:
            result = bs_select_next.find_all("a", class_= next_page_class_meli)
            print(str(result[0]["href"]))
            return str(result[0]["href"])
        except Exception:
            None


def fetch(url: str):
    try:
        page = _requests.get(url, headers={"user-agent": "Fake user-agent"})
        page.raise_for_status()
    except (ReadTimeout, ConnectionError, HTTPError):
        return None

    return page.text


def generate_url(web_site: str, product: str):
    if web_site == 'mercadolivre':
        url = f"https://lista.mercadolivre.com.br/{product}#D[A:{product}]"
        return url
    else:
        url = f"https://www.buscape.com.br/search?q={product}"
        return url


def meli_qtd_pages(data):
    content = _bs4.BeautifulSoup(data, "html.parser")
    result = content.find("li", class_= 'andes-pagination__page-count')
    return str(result.contents[2])


def scrape_meli_content(html_content, url_list):
    # print('cheguei aqui')
    
    print(len(url_list))
    new_page_url = scrape_next_page_link(html_content, 'mercadolivre')
    new_url = fetch(new_page_url)
    if new_page_url:
        url_list.append(new_page_url)
        scrape_meli_content(new_url, url_list)

        
    
def manage_scrape(web_site: str, product: str):
    main_url = generate_url(web_site, product)
    main_url_fetch = fetch(main_url)
    if web_site == 'mercadolivre':
        # total_pages = meli_qtd_pages(main_url_fetch)
        return scrape_meli_content(main_url_fetch, [])

        

manage_scrape('mercadolivre', 'geladeira')