# 🎭 Camarote Atmosfera — Guia de Edição

## Estrutura de arquivos
```
atmosfera/
├── index.html       ← conteúdo do site (textos, seções)
├── css/style.css    ← visual (cores, fontes, layout)
├── js/main.js       ← configurações (data, links, whatsapp)
└── images/          ← suas fotos aqui
```

---

## ✏️ Edições mais comuns

### 1. Alterar a data do Carnaval
Abra `js/main.js` e mude a linha:
```js
carnavalDate: new Date('2027-02-20T21:00:00-03:00'),
```

### 2. Adicionar link de compra de ingressos
Em `js/main.js`:
```js
ticketLinks: {
  sexta:  'https://sympla.com.br/seu-evento',
  sabado: 'https://sympla.com.br/seu-evento-sabado',
},
```

### 3. Alterar preços dos ingressos
Em `index.html`, encontre o bloco do ingresso e mude o número:
```html
<span class="ticket-value" data-price="1500">1.500</span>
```

### 4. Adicionar fotos na galeria
1. Coloque sua foto na pasta `images/`
2. Em `index.html`, encontre a seção `#galeria`
3. Troque um placeholder por:
```html
<div class="gallery-item">
  <img src="images/sua-foto.jpg" alt="Camarote Atmosfera">
</div>
```

### 5. Alterar horários do transporte
Em `index.html`, encontre a seção `#transporte` e altere os `<span class="stop-time">` e `<span class="stop-name">`.

### 6. Mudar WhatsApp de contato
Em `js/main.js`:
```js
whatsappNumber: '5521999999999',  // DDI + DDD + número
```

---

## 🚀 Publicar no Vercel

1. Suba os arquivos para o GitHub
2. Acesse vercel.com → New Project → importe seu repositório
3. Pronto! O site vai ao ar automaticamente

Toda vez que você salvar uma mudança no GitHub, o Vercel atualiza o site em ~30 segundos.

---

## 🎨 Mudar cores
As cores principais estão no topo de `css/style.css`:
```css
--gold:   #C9A84C;   /* dourado */
--black:  #0A0A0A;   /* fundo principal */
--white:  #F5F0E8;   /* texto claro */
```
