# Documentação do API

A documentação de todos os endpoins criados com os seus retornos

## API March 7th

### getCharacter

Essa função é responsável por pegar alguns dados genéricos do personagem para a página inicial <verificar viabilidade de trocar no futuro>

Endpoint:

```url
http://localhost:3000/api/github/:id
```

#### JSON de retorno:

```json
{
    "id": "1107",
    "name": "Clara",
    "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1107.png"
}
```

### getCharacterAllInformation

```url
http://localhost:3000/api/github/characters/all/:id
```

Recebe `:id` do personagem e retorna uma grande quantidade de informações relevantes para o personagem, exceto aquelas que são de modos de jogos diferentes do padrão. Ele retorna um JSON com todas essas informações relevantes. Abaixo exemplo de retorno de função com o `id` de 1107.

<details>
    <summary> JSON de retorno: </summary>

```json
{
    "id": "1107",
    "name": "Clara",
    "rarity": 5,
    "element": {
        "id": "Physical",
        "name": "Físico",
        "desc": "Ao usar ataques Físicos para infligir Quebra de Fraqueza, causa Dano Físico e aplica o efeito Sangramento, causando Dano Físico Contínuo.",
        "color": "#FFFFFF",
        "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/element/Physical.png"
    },
    "max_sp": 110,
    "ranks": [
        {
            "id": "110701",
            "name": "Uma Figura Alta",
            "rank": 1,
            "desc": "Usar a Perícia não removerá Marcas do Contra-Ataque do inimigo.",
            "materials": [
                {
                    "id": "11107",
                    "num": 1
                }
            ],
            "level_up_skills": [],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_rank1.png"
        },
        {
            "id": "110702",
            "name": "Um Abraço Apertado",
            "rank": 2,
            "desc": "Após usar a Perícia Suprema, o ATQ aumenta em 30% por 2 rodada(s).",
            "materials": [
                {
                    "id": "11107",
                    "num": 1
                }
            ],
            "level_up_skills": [],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_rank2.png"
        },
        {
            "id": "110703",
            "name": "Armadura de Aço Fria",
            "rank": 3,
            "desc": "Nv. da Perícia +2, até no máximo Nv. 15.\nNv. do ATQ Básico +1, até no máximo Nv. 10.",
            "materials": [
                {
                    "id": "11107",
                    "num": 1
                }
            ],
            "level_up_skills": [
                {
                    "id": "110702",
                    "num": 2
                },
                {
                    "id": "110701",
                    "num": 1
                }
            ],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_skill.png"
        },
        {
            "id": "110704",
            "name": "Aconchego Familiar",
            "rank": 4,
            "desc": "Após sofrer um ataque, o Dano recebido por Clara é reduzido em 30%. Este efeito dura até o início da rodada seguinte.",
            "materials": [
                {
                    "id": "11107",
                    "num": 1
                }
            ],
            "level_up_skills": [],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_rank4.png"
        },
        {
            "id": "110705",
            "name": "Uma Pequena Promessa",
            "rank": 5,
            "desc": "Nv. da Perícia Suprema +2, até no máximo Nv. 15.\nNv. do Talento +2, até no máximo Nv. 15.",
            "materials": [
                {
                    "id": "11107",
                    "num": 1
                }
            ],
            "level_up_skills": [
                {
                    "id": "110703",
                    "num": 2
                },
                {
                    "id": "110704",
                    "num": 2
                }
            ],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_ultimate.png"
        },
        {
            "id": "110706",
            "name": "Longa Companhia",
            "rank": 6,
            "desc": "Quando outros aliados são atacados, Svarog também tem 50% de chance fixa de ativar um Contra-Ataque no atacante e marcá-lo com uma \"Marca do Contra-Ataque\". Ao usar a Perícia Suprema, o número de Contra-Ataque(s) Aprimorado(s) aumenta em 1.",
            "materials": [
                {
                    "id": "11107",
                    "num": 1
                }
            ],
            "level_up_skills": [],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_rank6.png"
        }
    ],
    "skills": [
        {
            "id": "110701",
            "name": "Eu Quero Ajudar",
            "max_level": 10,
            "element": "Physical",
            "type": "Normal",
            "type_text": "ATQ Básico",
            "effect": "SingleAttack",
            "effect_text": "Alvo Único",
            "simple_desc": "Causa Dano Físico leve a um único inimigo.",
            "desc": "Causa Dano Físico igual a #1[i]% do ATQ de Clara a um único inimigo.",
            "params": [
                [
                    0.5
                ],
                [
                    0.6
                ],
                [
                    0.7
                ],
                [
                    0.8
                ],
                [
                    0.9
                ],
                [
                    1
                ],
                [
                    1.1
                ],
                [
                    1.2
                ],
                [
                    1.3
                ],
                [
                    1.4
                ]
            ],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_basic_atk.png"
        },
        {
            "id": "110702",
            "name": "Svarog Cuida de Você",
            "max_level": 15,
            "element": "Physical",
            "type": "BPSkill",
            "type_text": "Perícia",
            "effect": "AoEAttack",
            "effect_text": "Área",
            "simple_desc": "Causa Dano Físico a todos os inimigos. Adicionalmente, causa Dano Físico a alvos com Marcas do Contra-Ataque.",
            "desc": "Causa Dano Físico igual a #1[i]% do ATQ de Clara a todos os inimigos e adicionalmente causa Dano Físico igual a #2[i]% do ATQ de Clara a inimigos marcados por Svarog com uma Marca do Contra-Ataque.\nApós o uso desta Perícia, todas as Marcas do Contra-Ataque serão removidas.",
            "params": [
                [
                    0.6,
                    0.6
                ],
                [
                    0.66,
                    0.66
                ],
                [
                    0.72,
                    0.72
                ],
                [
                    0.78,
                    0.78
                ],
                [
                    0.84,
                    0.84
                ],
                [
                    0.9,
                    0.9
                ],
                [
                    0.975,
                    0.975
                ],
                [
                    1.05,
                    1.05
                ],
                [
                    1.125,
                    1.125
                ],
                [
                    1.2,
                    1.2
                ],
                [
                    1.26,
                    1.26
                ],
                [
                    1.32,
                    1.32
                ],
                [
                    1.38,
                    1.38
                ],
                [
                    1.44,
                    1.44
                ],
                [
                    1.5,
                    1.5
                ]
            ],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_skill.png"
        },
        {
            "id": "110703",
            "name": "É Uma Promessa, Não Uma Ordem",
            "max_level": 15,
            "element": "",
            "type": "Ultra",
            "type_text": "Perícia Suprema",
            "effect": "Enhance",
            "effect_text": "Aprimoramento",
            "simple_desc": "Reduz o Dano recebido, aumenta as chances de receber ataques de inimigos, e aprimora Contra-Ataques.",
            "desc": "Após Clara usar sua Perícia Suprema, o Dano causado a ela é reduzido em #4[i]% extra, e ela terá muito mais chances de ser atacada por inimigos por #3[i] rodada(s).\nAlém disso, o Contra-Ataque de Svarog é aprimorado. Quando um aliado é atacado, Svarog usa um Contra-Ataque imediatamente, e seu multiplicador de Dano contra o inimigo aumenta em #2[i]%. Inimigos adjacentes a ele sofrem 50% do Dano causado ao inimigo-alvo principal. Contra-Ataque(s) aprimorado(s) podem entrar em vigor #5[i] vez(es).",
            "params": [
                [
                    5,
                    0.96,
                    2,
                    0.15,
                    2
                ],
                [
                    5,
                    1.024,
                    2,
                    0.16,
                    2
                ],
                [
                    5,
                    1.088,
                    2,
                    0.17,
                    2
                ],
                [
                    5,
                    1.152,
                    2,
                    0.18,
                    2
                ],
                [
                    5,
                    1.216,
                    2,
                    0.19,
                    2
                ],
                [
                    5,
                    1.28,
                    2,
                    0.2,
                    2
                ],
                [
                    5,
                    1.36,
                    2,
                    0.2125,
                    2
                ],
                [
                    5,
                    1.44,
                    2,
                    0.225,
                    2
                ],
                [
                    5,
                    1.52,
                    2,
                    0.2375,
                    2
                ],
                [
                    5,
                    1.6,
                    2,
                    0.25,
                    2
                ],
                [
                    5,
                    1.664,
                    2,
                    0.26,
                    2
                ],
                [
                    5,
                    1.728,
                    2,
                    0.27,
                    2
                ],
                [
                    5,
                    1.792,
                    2,
                    0.28,
                    2
                ],
                [
                    5,
                    1.856,
                    2,
                    0.29,
                    2
                ],
                [
                    5,
                    1.92,
                    2,
                    0.3,
                    2
                ]
            ],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_ultimate.png"
        },
        {
            "id": "110704",
            "name": "Porque Somos Uma Família",
            "max_level": 15,
            "element": "Physical",
            "type": "Talent",
            "type_text": "Talento",
            "effect": "SingleAttack",
            "effect_text": "Alvo Único",
            "simple_desc": "O Dano recebido de ataques inimigos é reduzido. Inimigos que atacarem Clara serão marcados com uma Marca do Contra-Ataque, e receberão um Contra-Ataque de Svarog que causa Dano Físico.",
            "desc": "Sob a proteção de Svarog, o Dano recebido por Clara ao ser atingida por ataques inimigos é reduzido em #3[i]%. Svarog marca inimigos que atacarem Clara com sua Marca do Contra-Ataque e então Contra-Ataca, causando Dano Físico igual a #2[i]% do ATQ de Clara.",
            "params": [
                [
                    1,
                    0.8,
                    0.1
                ],
                [
                    1,
                    0.88,
                    0.1
                ],
                [
                    1,
                    0.96,
                    0.1
                ],
                [
                    1,
                    1.04,
                    0.1
                ],
                [
                    1,
                    1.12,
                    0.1
                ],
                [
                    1,
                    1.2,
                    0.1
                ],
                [
                    1,
                    1.3,
                    0.1
                ],
                [
                    1,
                    1.4,
                    0.1
                ],
                [
                    1,
                    1.5,
                    0.1
                ],
                [
                    1,
                    1.6,
                    0.1
                ],
                [
                    1,
                    1.68,
                    0.1
                ],
                [
                    1,
                    1.76,
                    0.1
                ],
                [
                    1,
                    1.84,
                    0.1
                ],
                [
                    1,
                    1.92,
                    0.1
                ],
                [
                    1,
                    2,
                    0.1
                ]
            ],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_talent.png"
        },
        {
            "id": "110706",
            "name": "Ataque",
            "max_level": 1,
            "element": "Physical",
            "type": "MazeNormal",
            "type_text": "",
            "effect": "MazeAttack",
            "effect_text": "",
            "simple_desc": "Ataca um inimigo, e, quando a batalha começa, reduz a Tenacidade do alvo inimigo do Tipo correspondente.",
            "desc": "Ataca um inimigo, e, quando a batalha começa, reduz a Tenacidade do alvo inimigo do Tipo correspondente.",
            "params": [],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_basic_atk.png"
        },
        {
            "id": "110707",
            "name": "Um Preço Baixo pela Vitória",
            "max_level": 1,
            "element": "Physical",
            "type": "Maze",
            "type_text": "Técnica",
            "effect": "MazeAttack",
            "effect_text": "",
            "simple_desc": "Ataca o inimigo. Depois de entrar em batalha, a chance desta personagem ser atacada por inimigos aumenta.",
            "desc": "Ataca o inimigo imediatamente. Ao entrar na batalha, a chance de Clara ser atacada por inimigos aumenta por #1[i] rodada(s).",
            "params": [
                [
                    2,
                    5
                ]
            ],
            "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/skill/1107_technique.png"
        }
    ],
    "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1107.png",
    "preview": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_preview/1107.png",
    "portrait": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/image/character_portrait/1107.png"
}
```

</details>

### getCharacterByName

```url
http://localhost:3000/api/github/characters/by-name/Clara
```

Esse código serve para alguma pesquisa de personagem específica baseado em um nome digitado, talvez seja descontinuado mais para frente pela manipulação direta pelo ID.

```json
{
    "id": "1107",
    "name": "Clara",
    "icon": "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/character/1107.png"
}
```

### getAllCharacters

```json
http://localhost:3000/api/github/characters/all
```

Essa função retorna basicamente todos os personagens que estão na base de dados de personagens sem tratativa.