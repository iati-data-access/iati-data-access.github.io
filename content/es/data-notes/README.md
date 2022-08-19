---
title: Notas sobre datos
---

# Notas sobre datos

Como se indica en el Plan Estratégico de la IATI (2020-2025), impulsar una mejora significativa de la calidad de los datos publicados es uno de los tres objetivos principales de la IATI. Como se ha explicado en la [introducción](/es/introduction/#11-ayudar-a-los-gobiernos-de-los-paises-asociados-a-mejorar-su-acceso-a-los-datos-de-la-iati-y-a-usarlos), en los últimos años ha tenido lugar una mejora significativa de la calidad de los datos, si bien esta sigue variando según la entidad. Esto quiere decir que los usuarios de los datos deben analizar los datos con cautela; la presente sección de notas sobre los datos tiene por objetivo ayudar a los usuarios y proporcionarles un resumen sencillo de los datos publicados por cada entidad.

## 3.1 Campos de los datos de salida

Se publica un archivo por país, que contendrá una serie común de campos para todas las actividades. Los archivos se han diseñado de manera que pueda añadirse una tabla dinámica a los datos, con el fin de poder agregar y resumir los datos de distintas formas según las necesidades del usuario.

No se publican todos los campos para todas las actividades. La calidad de los datos variará según la organización.

No se publican todos los tipos de transacción para todas las organizaciones. En particular, los ingresos de fondos deben manejarse con cuidado. Potencialmente permiten a un usuario calcular los desembolsos netos de una actividad (mediante desembolsos + gasto - ingresos de fondos). No obstante, la mayoría de organizaciones actualmente no publica los ingresos de fondos, de modo que los “desembolsos netos” pueden proporcionar una idea inexacta de los datos, pues serán exactos solo en el caso de algunas organizaciones.

<div class="table">

Columna | Ejemplo (transacciones) | Ejemplo (presupuestos)
--- | --- | ---
Identificador de la IATI | 44000-P163328 | 44000-P163328
Título | Himachal Pradesh State Roads Transformation Project | Himachal Pradesh State Roads Transformation Project
Organización informante | 44000 – Banco Mundial | 44000 – Banco Mundial
Tipo de organización informante | 40 – Multilateral | 40 – Multilateral
Tipo de ayuda | C01 – Intervenciones basadas en proyectos| C01 – Intervenciones basadas en proyectos
Tipo de financiación | 410 – Asistencia mediante préstamo sin reorganización de la deuda | 410 – Asistencia mediante préstamo sin reorganización de la deuda
Tipo de flujo | 10 – Asistencia oficial para el desarrollo | 10 – Asistencia oficial para el desarrollo
Organización proveedora | 44001 - Banco Internacional de Reconstrucción y Fomento | 44001 - Banco Internacional de Reconstrucción y Fomento
Tipo de organización proveedora | 40 – Multilateral | 40 – Multilateral
Organización beneficiaria | Himachal Pradesh Roads & Other Infrastructure Development Corporation Ltd. | Himachal Pradesh Roads & Other Infrastructure Development Corporation Ltd.
Tipo de organización beneficiaria | |
Tipo de transacción | 2 - Compromiso de pago saliente | budget - Budget
País o región beneficiaria | IN - India | IN - India
Multinacional [^1] | 1  | 1
Categoría del sector | 210 – Transporte y almacenamiento | 210 – Transporte y almacenamiento
Sector | 21020 - Transporte por carretera | 21020 - Transporte por carretera
Humanitario  | 0 | 0
Año natural | 2019 | 2019
Trimestre natural | T4 | T4
Año y trimestre naturales | 2019 T4 | 2019 T4
URL | https://d-portal.org/q.html?aid=44000-P163328 | https://d-portal.org/q.html?aid=44000-P163328
Valor (USD) | 47,560,000 | 435,000
Valor (EUR) | 41,213,347 | 376,951
Valor (Divisa local) | 33,589,335,939 | 32,829,292

</div>

## 3.2 Datos de resumen por entidad indicando la falta de datos por año

En la siguiente tabla se refleja cada entidad y la cantidad total de financiación (en millones de dólares de los Estados Unidos) que aparece en sus datos publicados una vez procesados, para todos los países o regiones. Se incluyen datos de los últimos tres años (compromisos, desembolsos y gastos) y de los próximos tres años (presupuestos).

La tabla de Excel descargable contiene más datos: incluye datos los últimos dos años, el año en curso y los próximos dos años (presupuestos, ingresos de fondos, compromisos, desembolsos y gastos).

Esto permitirá identificar carencias de datos generales que pueda ser necesario conocer. Las carencias de datos (donde el resultado ha sido 0.00 USD) están subrayadas en amarillo.


<a
  href="https://countrydata.iatistandard.org/data/summary_year.xlsx"
  class="download-button">Descargar tabla en formato Excel →</a>

<DataGapsYear />

## 3.3 Divisa local para cada país

<CountriesCurrencies />


[^1]: Indica si este gasto era originariamente parte de un proyecto multinacional y si la financiación del país se ha calculado en función de la división de porcentajes de la actividad entre los países.
