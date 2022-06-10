##  ⚠️ Maintenance ⚠️
*After July 31 of 2022, this application will no longer be maintained by the FPA APUB team or the RPT LATAM team. Maintenance will be the responsibility of the ecosystem, everyone will be able to make a branch with the changes or improvements they want to make, make a pull request and we will approve it.*

---

📢 Use this project, [contribute](https://github.com/vtex-apps/promotion-cloner) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Admin Ley de Gondolas

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Admin Ley de Gondolas will help to carry out the **necessary integration** to comply with the [Ley de Gondolas](https://www.argentina.gob.ar/justicia/derechofacil/leysimple/ley-de-gondolas) from Argentina

![Media Placeholder](https://user-images.githubusercontent.com/55905671/137961451-a9f0f85e-a3d9-43ab-af9e-84e5be9f6346.gif)

---

## Configuration

1. Using your terminal and the [VTEX IO Toolbelt](https://vtex.io/docs/recipes/development/vtex-io-cli-installment-and-command-reference), log into the desired VTEX account.
2. Run `vtex install vtexarg.admin-ley-gondolas-arg` on the account you're working on.
3. We needs to **Config MasterData**, do a [`GET`] to the endpoint dedicated to **config** the app [https://{account}.myvtex.com/v0/config](https://{account}.myvtex.com/v0/config) (Replace `{account}` with the desired VTEX account)
   ![image](https://user-images.githubusercontent.com/55905671/137963832-03e66403-b45c-4b3f-9517-5758829e2b99.png)
4. Access your VTEX account's admin.
5. Access **Catalog** and then **Ley de Gondolas**.

---

## Modus Operandi

In the first column you can see all the
[Categories includes in the law](https://www.argentina.gob.ar/produccion/leydegondolas/categorias-y-productos).
![image](https://user-images.githubusercontent.com/55905671/137969788-efb1be53-ceaf-4cb7-aa35-469e3ee9e067.png)

Then you can select for each Law's Category which category **in your catalog** correspond.

![Media Placeholder](https://user-images.githubusercontent.com/55905671/137970575-d6a29ba4-cece-4b23-bf21-af83606ecc26.gif)

Then you can see the products of that category.
![Media Placeholder](https://user-images.githubusercontent.com/55905671/137971112-3b9c9957-3cc2-45c4-b3a7-c65111693293.gif)

In this table we can see:
![image](https://user-images.githubusercontent.com/55905671/137974137-fea954dd-eb2f-4207-9d48-0fdc7f6c74cf.png)

1. Image
2. See on Catalog, if you click you can see the product in the catalog to check if you need to change the `Ley de Gondolas's Products Fields`.
   ![Media Placeholder](https://user-images.githubusercontent.com/55905671/137973483-9abcfe9d-15b8-49a1-b7e0-40cfc8d9fadc.gif)
3. Name: if you click, you will we redirect to the PDP of the product.
4. Price Per Unit: this data is getting from the `pricePerUnit` product field from `leyDeGondolas` group, the list of products will **always order by this column**.
5. Best Lower Price: you will see a check if in the `leyDeGondolas` product field from `leyDeGondolas` group have checked the value `Mejor Menor Valor x Unidad`.
6. PyMEs: you will see a check if in the `leyDeGondolas` product field from `leyDeGondolas` group have checked the value `PyMEs`.
7. Brand
   <!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
   <!-- prettier-ignore-start -->
   <!-- markdownlint-disable -->

<!-- DOCS-IGNORE:start -->

---

## Contributors ✨

Thanks goes to these wonderful people:

<table>
  <tr>
    <td align="center"><a href="https://github.com/germanBonacchi"><img src="https://avatars.githubusercontent.com/u/55905671?v=4" width="100px;" alt=""/><br /><sub><b>Germán Bonacchi</b></sub></a><br /><a href="https://github.com/vtex-apps/quantity-on-cart/commits?author=germanBonacchi" title="Code">💻</a></td>
  </tr>
</table>
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
