# Design Rules – Projeto (Baseado na Tela Anexada)

Este documento define **todas as regras de design**, incluindo componentes, paleta de cores, tipografia, espaçamentos, layout, e comportamento visual, para que qualquer IA ou desenvolvedor consiga recriar o sistema de forma idêntica utilizando **TailwindCSS**.

---

# 1. Identidade Visual

## 1.1. Paleta de Cores
As cores foram extraídas diretamente do design da imagem.

### **Cores Primárias**
- **Verde Água / Turquesa** – `#33C6C5`
  - Usado no header, elementos de destaque e navegação.
- **Roxo Claro** – `#BFA5FF`
  - Botões primários (DETALHES).

### **Cores Secundárias**
- **Cinza Claro** – `#F5F7FA`
  - Fundo das seções e cartões.
- **Cinza Médio** – `#C4CBD3`
  - Linhas divisórias.
- **Cinza Escuro** – `#6A6F77`
  - Textos secundários.

### **Cores Neutras**
- **Branco** – `#FFFFFF`
- **Preto / Cinza Muito Escuro** – `#1E1F20`

---

# 2. Tipografia

### **Fonte Padrão:** Sans-serif (recomendado: Inter, Roboto ou Poppins)
Tailwind: `font-sans`

### **Tamanhos de Texto**
- **Título da página:** `text-xl font-bold`
- **Títulos das seções (dias):** `text-sm font-bold`
- **Labels (NOME, HORÁRIO, DATA):** `text-xs font-semibold`
- **Conteúdo dos labels:** `text-xs`
- **Botões:** `text-xs font-semibold`

### **Cores do texto**
- Títulos: `text-gray-800`
- Textos secundários: `text-gray-600`
- Botões: `text-gray-700`

---

# 3. Componentes do Sistema

## 3.1. Header Superior
**Descrição:** Barra superior com ícone de voltar, nome da paróquia e ícone de igreja.

**Estilo:**
- Altura: `h-16`
- Fundo: `bg-[#33C6C5]`
- Texto: branco, centralizado
- Ícones com círculo branco: `bg-white rounded-full p-2`
- Layout: `flex items-center justify-between px-4`

---

## 3.2. Lista de Publicações
Cada item representa um evento religioso.

### **Cartão de Evento**
- Padding interno: `p-4`
- Arredondamento: `rounded-xl`
- Borda suave: `border border-gray-200`
- Fundo: `bg-white`
- Sombra leve: `shadow-sm`

### **Imagem do Evento**
- Tamanho aproximado: `w-24 h-20`
- Arredondamento: `rounded-md`
- Comportamento: cover

### **Conteúdo do Cartão**
- Layout horizontal: `flex gap-4`

### **Informações Internas**
```
NOME: MISSA DE HOJE
HORÁRIO: 09:00
DATA: 31/07/2021
```
- Tamanho: `text-xs`
- Espaçamento entre linhas: `leading-tight`

### **Botão DETALHES**
- Fundo: `bg-[#BFA5FF]`
- Texto: `text-gray-700`
- Padding: `px-4 py-1`
- Tamanho da fonte: `text-xs font-semibold`
- Borda: `rounded-md`
- Hover (sutil): `hover:bg-[#a88ef0]`

---

## 3.3. Navegação Inferior
Barra com duas abas (Publicações e Informativos).

- Altura: `h-14`
- Fundo: `bg-white`
- Borda superior: `border-t border-gray-200`
- Itens: `flex-1 flex flex-col items-center justify-center text-xs`
- Aba ativa:
  - Ícone colorido: `text-[#33C6C5]`
  - Texto com destaque: `font-semibold text-[#33C6C5]`

---

# 4. Layout Geral

### **Paddings e Margens**
- Margem superior das seções: `mt-4`
- Espaço entre cartões: `space-y-4`
- Padding horizontal da página: `px-3`

### **Larguras**
- O layout é mobile-first.
- Máximo recomendado: `max-w-md mx-auto`

### **Divisores**
Linhas entre dias:
- `h-px bg-gray-300 my-3`

---

# 5. Estilo Geral dos Elementos

### **Cantinhos arredondados predominantes:** `rounded-xl`
### **Sombra leve:** `shadow-sm`
### **Interface limpa, com espaços bem distribuídos**
### **Prioridade para contraste suave (branco, cinza, verde água)**

---

# 6. TailwindCSS – Classes Globais Úteis

### Cores customizadas (sugestão para `tailwind.config.js`):
```js
extend: {
  colors: {
    primary: '#33C6C5',
    accent: '#BFA5FF',
    softgray: '#F5F7FA',
    mediumgray: '#C4CBD3',
    darkgray: '#6A6F77',
  }
}
```

### Radius utilizados:
- `rounded-md`
- `rounded-lg`
- `rounded-xl`

### Sombra:
- `shadow-sm`

---

# 7. Comportamentos de Interação

### Botões
- Leve escurecimento no hover.

### Lista Rolável
- Interface vertical com scroll suave: `overflow-y-auto`

### Ícones de navegação
- Mudam de cor quando ativos.

---

# 8. Componentes que Devem ser Criados

1. **Header** com ícones lateral esquerdo e direito
2. **Card de Evento**
3. **Componente de Data/Título da Seção**
4. **Botão Primário** (DETALHES)
5. **Barra de Navegação Inferior**
6. **Divisor de Seção**
7. Layout global

---

Esse arquivo serve como guia para qualquer IA ou desenvolvedor criar a UI do projeto com fidelidade total ao design exibido na imagem.

