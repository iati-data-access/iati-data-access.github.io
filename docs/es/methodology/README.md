---
title: Metodología
---

_Fecha de actualización: 12 octubre 2021_

# Méthodologie

La presente metodología explica los pasos necesarios para obtener datos de la IATI en un formato que resulte útil para los gobiernos de los países asociados. Esta metodología identifica cómo recuperar los datos, reprocesarlos y armonizarlos y, finalmente, obtenerlos. A grandes rasgos, los pasos están en consonancia con los de las labores realizadas anteriormente, indicadas en la [subsección 1.3](/es/introduction/#_1-3-labores-realizadas-anteriormente-para-facilitar-los-datos-en-formato-excel). Durante el curso de estas labores, se seguirá perfeccionando y actualizando la metodología de acuerdo con la Secretaría de la IATI.

2.1 Recuperación de datos de la IATI
--------------------------

Tras realizar experimentos iniciales con varias interfaces de programación de aplicaciones (API, por sus siglas en inglés), el enfoque acordado consiste en descargar todos los datos y, a continuación, procesarlos sin usar el almacén de datos de la IATI ni otra API. Es preferible adoptar este enfoque, ya que este ejercicio descarga prácticamente todos los datos de la IATI igualmente. Mediante este enfoque, se puede aumentar el desempeño de manera significativa.

Desde el [volcado de datos de la IATI](https://iati-data-dump.codeforiati.org/), se tarda 53 segundos en descargar un archivo comprimido de 537 MB (9 GB descomprimido) que contiene todos los datos de la IATI.

Los datos se recuperan una vez al día.

2.2 Selección de actividades
---------------------------

Se incluyen todas las actividades en versión 2.01 o posterior de la IATI. En estos momentos, el 94% de los archivos que se publican en el Registro de la IATI utilizan la versión 2.01 o posterior. Procesar exclusivamente estos archivos reduce el costo de mantenimiento del software en el futuro y es probable que excluya una cantidad muy pequeña de datos que no están actualizados o que tienen poca calidad.

No se someten los datos a procesos de validación. Es decir, utilizamos tanto datos válidos como no válidos. Si surgen problemas de calidad de los datos, por lo general, se plantearán a la entidad que los publicó, en lugar de tratar de aplicar soluciones alternativas.

2.3 Extraer datos pertinentes
-------------------------

Se procesa cada archivo para extraer una serie de campos de cada transacción o presupuesto. En casos en los que no se facilitan datos en la transacción o en el presupuesto, recurrimos a los datos proporcionados a nivel de actividad.

### 2.3.1 Extraer datos de la actividad

En todos los casos, el Identificador de la IATI y la organización informante se extraen de la actividad.

#### Identificador de la IATI

Este es el identificador único de la actividad:

```xml
iati-activity/iati-identifier/text()
```

#### Título

El título de la actividad. N. B.: en los casos en los que se encuentra disponible en varios idiomas, intentamos que aparezca únicamente la versión en inglés en los resultados en inglés, y la versión en francés, español o portugués en sus resultados correspondientes:

```xml
iati-activity/title/narrative[not(@xml:lang) o @xml:lang='en']/text()
```

#### Organización informante

El nombre de la organización que publica estos datos de la IATI:

```xml
iati-activity/reporting-org/text()
```

#### Tipo de organización informante

El tipo de la organización informante que publica estos datos de la IATI:

```xml
iati-activity/reporting-org/@type
```

### 2.3.2 Extraer datos de la transacción

Los siguientes campos se extraen de cada transacción. En los casos en los que no existen estos cuatro campos, no se procesa la transacción.

#### Valor

El valor de la transacción en la moneda publicada:

```xml
transaction/value/text()
```

#### Fecha de la transacción

La fecha de la transacción (se utiliza para sumar las transacciones y en los resultados):

```xml
transaction/transaction-date/@iso-date
```

#### Fecha del valor de la transacción[^1]

La fecha del valor de la transacción en la moneda publicada (se utiliza como fecha de la conversión de moneda):

```xml
transaction/value/@value-date
```

#### Tipo de transacción

El tipo de transacción (por ejemplo, compromiso, desembolso, gasto, etc.):

```xml
transaction/transaction-type/@code
```

Nota: En un principio, se han descartado las transacciones que no constituyen ingresos de fondos, compromisos, desembolsos o gastos. Puede que se revise esta decisión más adelante, en función de la demanda y de la necesidad de mantener el tiempo de procesamiento en niveles razonables.

### 2.3.3 Extraer datos de la transacción o de la actividad

En algunos campos, los datos provienen de la transacción o de la actividad, según los datos de la entidad que los publica.

#### Divisa

La divisa de la transacción o la divisa por defecto de la actividad:

```xml
transaction/@currency or iati-activity/@default-currency
```

#### Tipo de ayuda

El tipo de ayuda de la transacción o el tipo de ayuda por defecto de la actividad (solo se incluyen los tipos de ayuda del Comité de Asistencia para el Desarrollo):

```xml
transaction/aid-type[not(@vocabulary) or @vocabulary='1'] /@code or iati-activity/default-aid-type[not(@vocabulary) or @vocabulary='1'] /@code
```

#### Tipo de financiación

El tipo de financiación de la transacción o el tipo de financiación por defecto de la actividad:

```xml
transaction/finance-type/@code or iati-activity/default-finance-type/@code
```

#### Tipo de flujo

El tipo de flujo de la transacción o el tipo de flujo por defecto de la actividad:

```xml
transaction/flow-type/@code or iati-activity/default-flow-type/@code
```

#### Organización proveedora

La organización proveedora de la transacción o la organización informante de la actividad:

```xml
transaction/provider-org/text()
```

#### Organización beneficiaria

La organización beneficiaria de la transacción, o la organización u organizaciones encargadas de la ejecución de la actividad:

```xml
transaction/provider-org/text()
```

#### Reservas del nivel de actividad para organizaciones proveedoras y beneficiarias

En los casos en los que no haya organización proveedora o beneficiaria en el nivel de transacción, se recurre a una organización de otra parte de la actividad. Se utilizan distintas reservas dependiendo del tipo de transacción que se esté procesando:

Tipo de transacción | Org. proveedora | Org. beneficiaria
--- | --- | ---
1 - Ingresos de fondos | Org. de financiación | Org. informante
2 - Compromiso de pago saliente | Org. informante | Org. encargada de la ejecución
3 - Desembolso | Org. informante | Org. encargada de la ejecución
4 - Gasto | Org. informante | Org. encargada de la ejecución

En los casos en los que hay varias organizaciones de financiación o encargadas de la ejecución, se concatenan (unen) mediante comas.

Para la organización informante utilizamos:

```xml
iati-activity/reporting-org/text()
```

Para la organización de financiación:

```xml
iati-activity/participating-org[@role='1']/text()
```

Para la organización encargada de la ejecución:

```xml
iati-activity/participating-org[@role='4']/text()
```

### 2.3.4 Extraer datos de la transacción o de la actividad con valores potencialmente múltiples

Por último, hay dos campos (país/región beneficiaria y sector) que se extraen de la transacción o la actividad. En el nivel de actividad, estos campos pueden publicarse múltiples veces con divisiones porcentuales. La metodología para gestionar valores múltiples se describe en la siguiente sección.

#### País o región

El país beneficiario de la transacción o la lista de países beneficiarios de la actividad (para los casos en los que hay varios países se ha añadido una columna en la que se indica que la transacción es parte de un proyecto multinacional):

```xml
transaction/recipient-country/@code or iati-activity/recipient-country/@code
```

Por el contrario, cuando no hay países beneficiarios, se buscan las regiones del Comité de Asistencia para el Desarrollo:

```xml
transaction/aid-type[not(@vocabulary) or @vocabulary='1'] /@code or iati-activity/default-aid-type[not(@vocabulary) or @vocabulary='1'] /@code
```

#### Sector

El sector de la transacción o la lista de sectores de la actividad (N. B.: solo se incluyen los sectores del Comité de Asistencia para el Desarrollo):

```xml
transaction/aid-type[not(@vocabulary) or @vocabulary='1'] /@code or iati-activity/default-aid-type[not(@vocabulary) or @vocabulary='1'] /@code
```

#### Humanitario

El marcador humanitario de la transacción o el marcador humanitario de la actividad:

```xml
transaction/@humanitarian or iati-activity/@humanitarian
```

* Si la transacción cuenta con un marcador humanitario (`1`), “humanitario” aparecerá marcado como `1`.
* Si la transacción cuenta con un marcador no humanitario (`0`), “humanitario” aparecerá marcado como `0`.

Si no hay marcadores en el nivel de la transacción:

* Si la actividad cuenta con un marcador humanitario (`1`), “humanitario” aparecerá marcado como `1`.
* Si la actividad cuenta con un marcador no humanitario (`0`), “humanitario” aparecerá marcado como `0`.


2.4 Dividir transacciones entre varios sectores y países
-------------------------------------------------------------

Como se ha descrito en la sección anterior, hay transacciones individuales que pueden corresponder a múltiples países y sectores. En cada caso, la transacción se divide según el valor proporcional al porcentaje de la transacción que corresponda al país o al sector. (N. B.: En los casos en los que no hay ni países ni regiones del Comité de Asistencia para el Desarrollo, la transacción se descarta. En los casos en los que no hay sectores, el sector se emite en blanco, dependiendo de qué enfoque sea más claro).

En algunos casos también puede ser que los porcentajes publicados no sean correctos. Por ejemplo, puede que sumados no lleguen al 100%, o que haya múltiples sectores sin porcentajes especificados. En dichos casos, los porcentajes se han ajustado y recalculado de modo que al sumarlos den el 100%. Por ejemplo:

Sector | Porcentaje (publicado) | Porcentaje (corregido)
--- | --- | ---
12220 Atención sanitaria básica | 100% | 50%
11220 Educación primaria | 100% | 50%

Una única transacción de 100 dólares de los Estados Unidos se divide en dos filas: una que corresponde a 50 dólares de los Estados Unidos para la atención sanitaria básica y otra que corresponde a 50 dólares de los Estados Unidos para la educación primaria. Si la misma actividad estuviera clasificada con dos países beneficiarios, se volvería a dividir de nuevo, ahora en cuatro filas.

Debe prestarse especial atención a la corrección de los porcentajes de los países. Diferentes organizaciones han interpretado de forma distinta las orientaciones de la IATI. Algunas han interpretado que, según las orientaciones, al sumar todos los países más todas las regiones se debe alcanzar el 100%, mientras que otras han entendido que los países y las regiones deben alcanzar el 100% por separado. Se aplica la siguiente lógica:


* A. Si hay país beneficiario y región beneficiaria, y el país beneficiario carece de porcentajes: se toma solo el país beneficiario;
  * Por ejemplo:
  ```xml
  <recipient-country code="LR" />
  <recipient-region code="298" />
  ```
  * Se aplica el 100% del valor de la transacción a Liberia (LR).
* B. Si tanto el país beneficiario como la región beneficiaria tienen porcentajes, pero los porcentajes del país beneficiario o de la región beneficiaria alcanzan, aproximadamente, el 100%: se toma solo el país beneficiario:
  * Por ejemplo:
  ```xml
  <recipient-country code="TD" percentage="70" />
  <recipient-country code="LR" percentage="30" />
  <recipient-region code="298" percentage="100" />
  ```
  * Se aplica el 70% del valor de la transacción al Chad (TD) y el 30% del valor de la transacción a Liberia (LR).
* C. En los demás casos, se toma el país beneficiario y la región beneficiaria.
  * Por ejemplo:
  ```xml
  <recipient-country code="TD" percentage="50" />
  <recipient-region code="298" percentage="50" />
  ```
  * Se aplica el 50% del valor de la transacción al Chad (TD) y el 50% del valor de la transacción a África Subsahariana (298).

2.5 Conversión de divisas
-----------------------

Dado que los datos se publican en diferentes divisas (dependiendo de la entidad que publique los datos), las transacciones individuales deben convertirse a dólares de los Estados Unidos (USD), euros, y otras divisas locales aplicando la fecha de tipo de cambio más próxima a la fecha de valor de la transacción. Los tipos de cambio mensuales de 169 divisas se extraen de la recopilación de datos International Financial Statistics del Fondo Monetario Internacional[^2].

2.6 Manejar los presupuestos
--------------------

También es importante recopilar datos de gasto prospectivos. Se trata de algo más complicado, puesto que, a diferencia de las transacciones, los presupuestos no se clasifican por sector o país, así que no es posible indicar específicamente la proporción del presupuesto que se dedica a un país o sector particular. Para poder hacer tal evaluación, hay ciertos datos del nivel de transacción o actividad que deben aplicarse a los datos presupuestarios. Por ejemplo, cuando en el nivel de actividad no hay sectores, la proporción del valor de las transacciones de compromiso para distintos sectores se utiliza para aplicar divisiones por sector a los presupuestos de una forma similar a lo descrito en la sección 2.3 anterior.

Este proceso para calcular la proporción de los compromisos se utiliza para:


* Tipos de ayuda
* Tipos de financiación
* Tipos de flujo
* Sector
* País

Para el campo de la organización proveedora se utiliza la organización informante de la actividad. Para el campo de la organización beneficiaria se utiliza la organización encargada de la ejecución de la actividad.

Cuando los presupuestos cubren más de un trimestre, se dividen en varias filas que corresponden, cada una, a un trimestre exacto. El valor se divide de forma proporcional[^3]. Esto es necesario para mantener la comparabilidad entre las transacciones (que están marcadas con una única fecha) y los presupuestos (que cubren un período y que pueden no coincidir con el año fiscal del gobierno).

Cuando tanto el presupuesto revisado como el original se publican para el mismo período, se usan los presupuestos revisados en lugar de los originales.

2.7 Acumular transacciones
---------------------------

Las transacciones se agregan en una fila por trimestre cuando los siguientes campos son idénticos.


* Identificador de la IATI
* Organización informante
* Tipo de organización informante
* Tipo de transacción
* Tipos de ayuda
* Tipos de financiación
* Tipos de flujo
* Organización proveedora
* Organización beneficiaria
* Sector
* País

La fecha de transacción es el último día del trimestre.

2.8 Conversión a la divisa y el período fiscal de destino
---------------------------------------------------

Las divisas de destino son, para todos los países, el dólar de los Estados Unidos (USD) y el euro. También se incluye una divisa local adicional (por ejemplo, el chelín keniano para los resultados de Kenya). La fecha de tipo de cambio es el último día del trimestre.

2.9 Idioma
------------

Los datos están disponibles en inglés, francés, español y portugués. Todos los títulos disponibles en dichos idiomas se incluyen en los resultados junto con todos los códigos. Algunos títulos y organizaciones beneficiarias y proveedoras solo están disponibles en inglés.

2.10 Procesamiento de los datos
-----------------------

Los datos se procesan con Github Actions, un servicio gratuito siempre y cuando el tiempo del procesamiento no supere las seis horas. Se lleva a cabo cada 3 horas. Los archivos de datos resultantes se publican en Github Pages,  que también es un servicio gratuito siempre y cuando los archivos no superen los 100 MB y el tamaño completo del repositorio no sea mayor que 1 GB.

Teniendo en cuenta estos límites, es importante limitar el tamaño de los archivos y los tiempos del procesamiento. Garantizar que el flujo de trabajo puede completarse mediante herramientas gratuitas también mejora significativamente la sostenibilidad de las herramientas.

2.11 Licencias
--------------

Todos los resultados se publican en Github con una licencia de tipo abierto según la Licencia Pública General Affero de GNU (AGPL, por sus siglas en inglés) v3.0[^4].


[^1]: N. B.: Parece ser que algunas entidades están usando el último día de actualización de los datos como fecha de valor de la transacción. En estos casos, se ha seguido utilizando la fecha del valor y se ha marcado como un asunto que el soporte de la IATI debe tratar con las entidades.

[^2]: [https://data.imf.org/?sk=4C514D48-B6BA-49ED-8AB9-52B0C1A0179B](https://data.imf.org/?sk=4C514D48-B6BA-49ED-8AB9-52B0C1A0179B) (Se abre en una nueva ventana)

[^3]: Si un presupuesto no cubre los trimestres de forma exacta, sino que lo hace de forma parcial, el número de días de dicho trimestre parcial se usan para calcular la proporción del valor que se atribuirá a cada trimestre.

[^4]: [https://www.gnu.org/licenses/agpl-3.0.en.html](https://www.gnu.org/licenses/agpl-3.0.en.html) (Se abre en una nueva ventana)
