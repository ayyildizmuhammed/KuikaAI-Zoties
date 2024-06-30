import { Inject, Service } from 'typedi'
import { ApplicationDbContext } from '../../Dal/ApplicationDbContext'
import OpenAI from 'openai'
import dotenv from 'dotenv'
// import fs from 'fs'
// import path from 'path'
// import { tmpdir } from 'os'

dotenv.config()

const USE_CASES = `{"UseCases":[{"UseCaseName":"UserRegistration","Actors":["Admin"],"Description":"Admin, yeni kullanıcı hesapları oluşturur.","Preconditions":["Admin sisteme giriş yapmış olmalı."],"Postconditions":["Yeni kullanıcı hesabı oluşturulmuş olmalı."],"CourseOfEvents":["Admin, 'Kullanıcı Kayıt' sayfasına gider.","Admin, kullanıcı bilgilerini (isim, soyisim, email, telefon, şifre) girer.","Admin, 'Kaydet' butonuna tıklar.","Sistem, kullanıcı bilgilerini doğrular ve yeni kullanıcı hesabını oluşturur.","Sistem, başarı mesajı gösterir."],"Exceptions":["Girilmiş email zaten kayıtlıysa, hata mesajı gösterilir.","Gerekli alanlar doldurulmamışsa, hata mesajı gösterilir."],"SpecialRequirements":["Kullanıcı şifresi en az 8 karakter olmalı ve bir büyük harf, bir küçük harf ve bir rakam içermeli."]},{"UseCaseName":"UserLogin","Actors":["User"],"Description":"Kullanıcı, sisteme giriş yapar.","Preconditions":["Kullanıcı kayıtlı olmalı."],"Postconditions":["Kullanıcı sisteme giriş yapmış olmalı."],"CourseOfEvents":["Kullanıcı, 'Giriş' sayfasına gider.","Kullanıcı, email ve şifresini girer.","Kullanıcı, 'Giriş Yap' butonuna tıklar.","Sistem, kullanıcı bilgilerini doğrular.","Sistem, kullanıcıyı ana sayfaya yönlendirir."],"Exceptions":["Email veya şifre yanlışsa, hata mesajı gösterilir.","Kullanıcı hesabı aktif değilse, hata mesajı gösterilir."],"SpecialRequirements":["Şifre giriş alanı maskelenmiş olmalı."]},{"UseCaseName":"FlightSearchAndFilter","Actors":["User"],"Description":"Kullanıcı, platformda istediği uçuşu arar ve arama sonuçlarını filtreler.","Preconditions":["Kullanıcı sisteme giriş yapmış olmalı."],"Postconditions":["Kullanıcı, arama sonuçlarını görüntülemiş olmalı."],"CourseOfEvents":["Kullanıcı, ana sayfadaki uçuş arama çubuğuna gider.","Kullanıcı, kalkış ve varış noktalarını, tarihleri ve yolcu sayısını girer.","Kullanıcı, 'Ara' butonuna tıklar.","Sistem, uçuşları arar ve sonuçları gösterir.","Kullanıcı, arama sonuçlarını fiyat, havayolu şirketi, uçuş süresi gibi kriterlere göre filtreler."],"Exceptions":["Girilen kriterlere uygun uçuş bulunamazsa, bilgi mesajı gösterilir."],"SpecialRequirements":["Arama sonuçları hızlı bir şekilde yüklenmeli."]},{"UseCaseName":"CreateAndManageReservation","Actors":["User"],"Description":"Kullanıcı, seçtiği uçuş için rezervasyon yapar ve mevcut rezervasyonları yönetir.","Preconditions":["Kullanıcı sisteme giriş yapmış olmalı.","Kullanıcı uçuş araması yapmış olmalı."],"Postconditions":["Yeni rezervasyon oluşturulmuş veya mevcut rezervasyon güncellenmiş olmalı."],"CourseOfEvents":["Kullanıcı, uçuş arama sonuçlarından bir uçuş seçer.","Kullanıcı, uçuş detay sayfasına gider.","Kullanıcı, koltuk seçimi yapar.","Kullanıcı, ödeme bilgilerini (kredi kartı numarası, son kullanma tarihi, CVV) girer.","Kullanıcı, 'Rezervasyon Yap' butonuna tıklar.","Sistem, ödeme bilgilerini doğrular ve rezervasyonu oluşturur.","Sistem, kullanıcıya rezervasyon onay mesajı gösterir.","Kullanıcı, kullanıcı panelinden rezervasyon geçmişini görüntüler ve rezervasyonları iptal veya değiştirme işlemleri yapar."],"Exceptions":["Ödeme bilgileri geçersizse, hata mesajı gösterilir.","Seçilen koltuklar doluysa, hata mesajı gösterilir."],"SpecialRequirements":["Ödeme işlemi güvenli bir şekilde gerçekleştirilmelidir."]},{"UseCaseName":"ProfileManagement","Actors":["User"],"Description":"Kullanıcı, profil bilgilerini günceller ve hesap ayarlarını yönetir.","Preconditions":["Kullanıcı sisteme giriş yapmış olmalı."],"Postconditions":["Profil bilgileri güncellenmiş olmalı."],"CourseOfEvents":["Kullanıcı, kullanıcı paneline gider.","Kullanıcı, 'Profil Düzenle' sayfasına gider.","Kullanıcı, profil bilgilerini (isim, soyisim, email, telefon, adres) günceller.","Kullanıcı, 'Kaydet' butonuna tıklar.","Sistem, güncellenen bilgileri doğrular ve kaydeder.","Sistem, başarı mesajı gösterir."],"Exceptions":["Gerekli alanlar doldurulmamışsa, hata mesajı gösterilir.","Email formatı geçersizse, hata mesajı gösterilir."],"SpecialRequirements":["Email adresi benzersiz olmalı."]},{"UseCaseName":"AddAndUpdateFlight","Actors":["Admin","AirlineCompany"],"Description":"Admin ve havayolu şirketine mensup kullanıcılar uçuşları ekler ve günceller.","Preconditions":["Admin veya havayolu şirketi kullanıcısı sisteme giriş yapmış olmalı."],"Postconditions":["Yeni uçuş eklenmiş veya mevcut uçuş güncellenmiş olmalı."],"CourseOfEvents":["Admin veya havayolu şirketi kullanıcısı, 'Uçuş Ekleme ve Güncelleme' sayfasına gider.","Kullanıcı, uçuş bilgilerini (uçuş numarası, kalkış noktası, varış noktası, tarih, saat, fiyat, koltuk sayısı) girer.","Kullanıcı, 'Kaydet' butonuna tıklar.","Sistem, uçuş bilgilerini doğrular ve kaydeder.","Sistem, başarı mesajı gösterir."],"Exceptions":["Gerekli alanlar doldurulmamışsa, hata mesajı gösterilir.","Uçuş numarası zaten kayıtlıysa, hata mesajı gösterilir."],"SpecialRequirements":["Uçuş bilgileri doğru ve eksiksiz olmalı."]},{"UseCaseName":"PromotionAndDiscountManagement","Actors":["Admin","AirlineCompany"],"Description":"Admin veya havayolu şirketi, promosyon ve indirimleri yönetir ve kullanıcılara sunar.","Preconditions":["Admin veya havayolu şirketi kullanıcısı sisteme giriş yapmış olmalı."],"Postconditions":["Yeni promosyon veya indirim eklenmiş veya mevcut promosyon güncellenmiş olmalı."],"CourseOfEvents":["Admin veya havayolu şirketi kullanıcısı, 'Promosyon ve İndirim Yönetimi' sayfasına gider.","Kullanıcı, promosyon bilgilerini (promosyon kodu, açıklama, indirim oranı, geçerlilik tarihi) girer.","Kullanıcı, 'Kaydet' butonuna tıklar.","Sistem, promosyon bilgilerini doğrular ve kaydeder.","Sistem, başarı mesajı gösterir."],"Exceptions":["Gerekli alanlar doldurulmamışsa, hata mesajı gösterilir.","Promosyon kodu zaten kayıtlıysa, hata mesajı gösterilir."],"SpecialRequirements":["Promosyon kodları benzersiz olmalı."]},{"UseCaseName":"SendNotifications","Actors":["Admin"],"Description":"Admin, kullanıcılara bildirimler gönderir.","Preconditions":["Admin sisteme giriş yapmış olmalı."],"Postconditions":["Kullanıcılara bildirim gönderilmiş olmalı."],"CourseOfEvents":["Admin, 'Bildirim Gönder' sayfasına gider.","Admin, bildirim mesajını (başlık, içerik) girer.","Admin, bildirim gönderilecek kullanıcıları seçer.","Admin, 'Gönder' butonuna tıklar.","Sistem, bildirimleri kullanıcılara gönderir.","Sistem, başarı mesajı gösterir."],"Exceptions":["Gerekli alanlar doldurulmamışsa, hata mesajı gösterilir."],"SpecialRequirements":["Bildirimler anında iletilmeli."]}]}`
const JSON_OUTPUT = `{
  "Entities": [
    {
      "Name": "User",
      "PrimaryKey": "Id",
      "Columns": [
        {
          "Name": "Id",
          "Datatype": "Guid",
          "IsUnique": true,
          "ForeignKeyOf": "",
          "Required": true,
          "DefaultValue": "",
          "ValidationRules": [],
          "Description": "Unique Identifier for the User"
        },
        {
          "Name": "FirstName",
          "Datatype": "String",
          "IsUnique": false,
          "ForeignKeyOf": "",
          "Required": true,
          "DefaultValue": "",
          "ValidationRules": [
            {
              "RuleName": "StringLength",
              "Value": {
                "min": 1,
                "max": 100
              },
              "Description": "First Name must be between 1 and 100 characters"
            }
          ],
          "Description": "First name of the user"
        },
        {
          "Name": "LastName",
          "Datatype": "String",
          "IsUnique": false,
          "ForeignKeyOf": "",
          "Required": true,
          "DefaultValue": "",
          "ValidationRules": [
            {
              "RuleName": "StringLength",
              "Value": {
                "min": 1,
                "max": 100
              },
              "Description": "Last Name must be between 1 and 100 characters"
            }
          ],
          "Description": "Last name of the user"
        },
        {
          "Name": "Email",
          "Datatype": "String",
          "IsUnique": true,
          "ForeignKeyOf": "",
          "Required": true,
          "DefaultValue": "",
          "ValidationRules": [
            {
              "RuleName": "Email",
              "Value": "",
              "Description": "Email must be in a proper format"
            }
          ],
          "Description": "Email of the user"
        },
        {
          "Name": "Phone",
          "Datatype": "String",
          "IsUnique": false,
          "ForeignKeyOf": "",
          "Required": false,
          "DefaultValue": "",
          "ValidationRules": [
            {
              "RuleName": "Phone",
              "Value": "",
              "Description": "Phone number in a proper format"
            }
          ],
          "Description": "Phone number of the user"
        },
        {
          "Name": "Password",
          "Datatype": "String",
          "IsUnique": false,
          "ForeignKeyOf": "",
          "Required": true,
          "DefaultValue": "",
          "ValidationRules": [
            {
              "RuleName": "CustomValidation",
              "Value": "StrongPasswordPolicy",
              "Description": "Password must adhere to strong password policies"
            }
          ],
          "Description": "Password of the user"
        }
      ],
      "Description": "Table containing user details"
    },
    {
      "Name": "UserRole",
      "PrimaryKey": "RoleId",
      "Columns": [
        {
          "Name": "RoleId",
          "Datatype": "Guid",
          "IsUnique": true,
          "ForeignKeyOf": "",
          "Required": true,
          "DefaultValue": "",
          "ValidationRules": [],
          "Description": "Unique Identifier for the Role"
        },
        {
          "Name": "RoleName",
          "Datatype": "String",
          "IsUnique": true,
          "ForeignKeyOf": "",
          "Required": true,
          "DefaultValue": "",
          "ValidationRules": [
            {
              "RuleName": "StringLength",
              "Value": {
                "min": 1,
                "max": 50
              },
              "Description": "Role Name must be between 1 and 50 characters"
            }
          ],
          "Description": "Name of the role"
        }
      ],
      "Description": "Table containing the roles of users"
    }
  ],
  "Roles": [
    {
      "Name": "User",
      "Description": "An individual who uses the system to manage their account and perform available tasks."
    },
    {
      "Name": "Admin",
      "Description": "An individual with elevated privileges who manages user accounts and system settings."
    }
  ],
  "EntityChangeLogics": [
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "Admin is logged into the system."
        },
        {
          "Description": "Admin is on the user management page."
        }
      ],
      "OperationType": "Create",
      "Pre/Post": "Pre",
      "Description": "System validates the entered data."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "Admin is logged into the system."
        },
        {
          "Description": "Admin is on the user management page."
        }
      ],
      "OperationType": "Create",
      "Pre/Post": "Post",
      "Description": "System creates the new user account. System sends a welcome email to the new user."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "User is logged into the system."
        },
        {
          "Description": "User is on the profile page."
        }
      ],
      "OperationType": "Update",
      "Pre/Post": "Pre",
      "Description": "System validates the entered data."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "User is logged into the system."
        },
        {
          "Description": "User is on the profile page."
        }
      ],
      "OperationType": "Update",
      "Pre/Post": "Post",
      "Description": "System updates the user's profile details."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "Admin is logged into the system."
        },
        {
          "Description": "Admin is on the user management page."
        }
      ],
      "OperationType": "Update",
      "Pre/Post": "Pre",
      "Description": "System validates the entered data."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "Admin is logged into the system."
        },
        {
          "Description": "Admin is on the user management page."
        }
      ],
      "OperationType": "Update",
      "Pre/Post": "Post",
      "Description": "System updates the user's details."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "Admin is logged into the system."
        },
        {
          "Description": "Admin is on the user management page."
        }
      ],
      "OperationType": "Delete",
      "Pre/Post": "Post",
      "Description": "System deletes the user account."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "User is on the login page."
        },
        {
          "Description": "User has a registered email address."
        }
      ],
      "OperationType": "Update",
      "Pre/Post": "Pre",
      "Description": "System validates the email address."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "User is on the login page."
        },
        {
          "Description": "User has a registered email address."
        }
      ],
      "OperationType": "Update",
      "Pre/Post": "Post",
      "Description": "System sends a password reset email to the user. System updates the user's password."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "User is logged into the system."
        },
        {
          "Description": "User is on the profile settings page."
        }
      ],
      "OperationType": "Update",
      "Pre/Post": "Pre",
      "Description": "System validates the current password. System validates the new password."
    },
    {
      "EntityName": "User",
      "Condition": [
        {
          "Description": "User is logged into the system."
        },
        {
          "Description": "User is on the profile settings page."
        }
      ],
      "OperationType": "Update",
      "Pre/Post": "Post",
      "Description": "System updates the user's password."
    }
  ],
  "ApplicationPages": [
    {
      "Title": "User Login Page",
      "Description": "This page allows users to log into the system using their username and password.",
      "Role": [
        {
          "RoleName": "User"
        },
        {
          "RoleName": "Admin"
        }
      ],
      "Actions": [
        {
          "Description": "User enters their email and password and logs into the system.",
          "AffectedEntities": [
            {
              "EntityName": "User",
              "EntityField": "Email",
              "Description": "Email input field used to enter the user's email."
            },
            {
              "EntityName": "User",
              "EntityField": "Password",
              "Description": "Password input field used to enter the user's password."
            }
          ],
          "Validation": [
            {
              "ValidationRuleName": "IsEmail",
              "Value": "true",
              "Description": "The email must be in a valid email format."
            },
            {
              "ValidationRuleName": "IsNotEmpty",
              "Value": "true",
              "Description": "The password field cannot be empty."
            }
          ]
        }
      ]
    },
    {
      "Title": "User Creation Page",
      "Description": "This page allows the Admin to create a new user account. The Admin enters the user details and saves the data.",
      "Role": [
        {
          "RoleName": "Admin"
        }
      ],
      "Actions": [
        {
          "Description": "Admin creates a new user by entering the user's details and saving the data.",
          "AffectedEntities": [
            {
              "EntityName": "User",
              "EntityField": "FirstName",
              "Description": "The Admin enters the first name of the new user."
            },
            {
              "EntityName": "User",
              "EntityField": "LastName",
              "Description": "The Admin enters the last name of the new user."
            },
            {
              "EntityName": "User",
              "EntityField": "Email",
              "Description": "The Admin enters the email of the new user."
            },
            {
              "EntityName": "User",
              "EntityField": "Phone",
              "Description": "The Admin enters the phone number of the new user."
            },
            {
              "EntityName": "UserRole",
              "EntityField": "RoleId",
              "Description": "The Admin assigns a role to the new user."
            }
          ],
          "Validation": [
            {
              "ValidationRuleName": "IsUnique",
              "Value": "Email",
              "Description": "The provided Email must be unique among all users."
            },
            {
              "ValidationRuleName": "IsRequired",
              "Value": "FirstName, LastName, Email",
              "Description": "The first name, last name, and email fields are required."
            },
            {
              "ValidationRuleName": "IsPhoneNumber",
              "Value": "Phone",
              "Description": "The provided phone number must be valid."
            }
          ]
        }
      ]
    }
  ],
  "Summary": "summaryAnalyzerResponse"
}`

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// Tip tanımlamaları
interface File {
    name: string
    data: Buffer
}

interface AnalysisResponse {
    Entities: any
    Roles: any
    EntityChangeLogics: any
    ApplicationPages: any
    SuggestionsHtml?: any
}

const USE_CASE_CREATOR_ASSISTANT_ID = 'asst_Ja9uFVn4rnQ6PCPoaHtRZRRW'
const ENTITY_CREATOR_ASSISTANT_ID = 'asst_AsYhVTLiK4ecanvjPnPi7Zkc'
const BUSINESS_LOGIC_CREATOR_ASSISTANT_ID = 'asst_YgPUCUtuVjxkZcoL17GROjMB'
const PAGES_CREATOR_ASSISTANT_ID = 'asst_ehSgFH2P25EYFkGv7gkpHwUs'
const SUMMARIZER_ASSISTANT_ID = 'asst_NZEKsmlfRjKOc5DmeXaHsaTx'
const TESTER_ASSISTANT_ID = 'asst_xgJeQemzbKY3SmUiGjFgyDjJ'

@Service()
export class AnalysisService {
    private _dbContext: ApplicationDbContext

    constructor(@Inject() dbContext: ApplicationDbContext) {
        this._dbContext = dbContext
    }

    async sayHiToAssistant(file: File): Promise<any> {
        console.log('File:', file.data.toString())
        return 'Hi!'
    }

    async summarizeDocument(finalJson: AnalysisResponse): Promise<any> {
        return await this.callSummaryAnalyzerGPT(finalJson)
    }

    async analysisDocument(file: File): Promise<AnalysisResponse> {
        try {
            const fileContent = file.data.toString()

            const useCaseCreatorResponse = await this.callUseCaseCreatorGPT(file)
            const entityAnalyzerResponse = await this.callEntityAnalyzerGPT(useCaseCreatorResponse)
            const businessLogicAnalyzerResponse = await this.callBusinessLogicAnalyzerGPT(useCaseCreatorResponse, entityAnalyzerResponse)
            const applicationPagesAnalyzerResponse = await this.callApplicationPagesAnalyzerGPT(useCaseCreatorResponse, entityAnalyzerResponse)

            const finalJson = {
                Entities: entityAnalyzerResponse.Entities,
                Roles: entityAnalyzerResponse.Roles,
                EntityChangeLogics: businessLogicAnalyzerResponse.EntityChangeLogics,
                ApplicationPages: applicationPagesAnalyzerResponse.Pages
            }

            const testerResponse = await this.callTesterGPT(file, useCaseCreatorResponse, finalJson)

            return {
                Entities: entityAnalyzerResponse.Entities,
                Roles: entityAnalyzerResponse.Roles,
                EntityChangeLogics: businessLogicAnalyzerResponse.EntityChangeLogics,
                ApplicationPages: applicationPagesAnalyzerResponse.Pages,
                SuggestionsHtml: testerResponse
            }
        } catch (error) {
            console.error('Error analyzing document:', error)
            throw new Error('Failed to analyze the document')
        }
    }

    private async callUseCaseCreatorGPT(file: File): Promise<any> {
        return this.callGPTService(`${file.data.toString()}`, USE_CASE_CREATOR_ASSISTANT_ID)
    }

    private async callEntityAnalyzerGPT(useCaseResponse: string): Promise<any> {
        return this.callGPTService(`${JSON.stringify(useCaseResponse)}`, ENTITY_CREATOR_ASSISTANT_ID)
    }

    private async callBusinessLogicAnalyzerGPT(useCaseResponse: string, entityAnalyzerResponse: string): Promise<any> {
        return this.callGPTService(`${JSON.stringify(useCaseResponse)} ${JSON.stringify(entityAnalyzerResponse)}`, BUSINESS_LOGIC_CREATOR_ASSISTANT_ID)
    }

    private async callApplicationPagesAnalyzerGPT(useCaseResponse: string, entityAnalyzerResponse: string): Promise<any> {
        return this.callGPTService(`${JSON.stringify(useCaseResponse)} ${JSON.stringify(entityAnalyzerResponse)}`, PAGES_CREATOR_ASSISTANT_ID)
    }

    private async callSummaryAnalyzerGPT(finalJson: AnalysisResponse): Promise<any> {
        return this.callGPTService(`${JSON.stringify(finalJson)}`, SUMMARIZER_ASSISTANT_ID)
    }

    private async callTesterGPT(file: File, useCaseResponse: string, finalJson: AnalysisResponse): Promise<any> {
        return this.callGPTService(`${file.data.toString()} ${JSON.stringify(useCaseResponse)} ${JSON.stringify(finalJson)}`, TESTER_ASSISTANT_ID)
    }

    private async callGPTService(prompt: string, assistantId: string, stringifyJson = true): Promise<any> {
        try {
            // Create a new thread
            const thread = await client.beta.threads.create()

            // Add your message to the thread
            await client.beta.threads.messages.create(thread.id, {
                role: 'user',
                content: prompt
            })

            // Create a new run
            const run = await client.beta.threads.runs.create(thread.id, {
                assistant_id: assistantId
            })

            // Polling to check the status of the run
            let isCompleted = false
            let result: any = null

            do {
                const check_run = await client.beta.threads.runs.retrieve(thread.id, run.id)

                if (check_run.status === 'completed') {
                    // Get the messages
                    const list_messages = await client.beta.threads.messages.list(thread.id)
                    result = list_messages.data
                    isCompleted = true
                } else if (check_run.status === 'requires_action') {
                    // Handle function calling
                    console.warn('Run requires action:', check_run)
                } else {
                    // Handle other status
                    console.warn('Run status:', check_run.status)
                }
                console.log('Is completed:', isCompleted)

                if (!isCompleted) {
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            } while (!isCompleted)

            return this.extractContentFromMessages(result)
        } catch (error) {
            console.error(`Error calling assistant ${assistantId}:`, error)
            throw new Error(`Failed to call assistant ${assistantId}`)
        }
    }

    private extractContentFromMessages(messages: any[]): any {
        const assistantMessages = messages.filter(message => message.role === 'assistant')
        if (assistantMessages.length > 0) {
            const content = assistantMessages[0].content[0].text.value
            console.log('Content:', content)
            const sanitizedContent = this.sanitizeJSONString(content)

            // Clean up the JSON content
            // console.log('Cleaned content:', sanitizedContent)
            // console.log('Parsed content:', JSON.parse(sanitizedContent))

            return JSON.parse(sanitizedContent)
        }
        return {}
    }

    private sanitizeJSONString(jsonString: string): string {
        return (
            jsonString
                .replace(/\\n/g, '')
                .replace(/\\'/g, "'")
                .replace(/"/g, '\\"') // Escape double quotes
                // .replace(/'/g, '"') // Replace single quotes with double quotes
                .replace(/\\"/g, '"') // Correct escaped double quotes
                .replace(/\[0\] /g, '')
                .replace(/\[\d+\] /g, '')
                .replace(/```json\s*/, '')
                .replace(/\s*```/, '')
        )
        // Remove additional array index indicators if present
    }

    // async analysisDocumentWithFile(file: File): Promise<AnalysisResponse> {
    //     try {
    //         const vectorStoreId = await this.uploadFile(file)
    //         this.updateAssistant(vectorStoreId, ENTITY_CREATOR_ASSISTANT_ID)
    //         // this.updateAssistant(vectorStoreId, PAGES_CREATOR_ASSISTANT_ID)
    //         // this.updateAssistant(vectorStoreId, BUSINESS_LOGIC_CREATOR_ASSISTANT_ID)

    //         const entityAnalyzerResponse = await this.callEntityAnalyzerGPT(vectorStoreId)
    //         // const businessLogicAnalyzerResponse = await this.callBusinessLogicAnalyzerGPT(vectorStoreId)
    //         // const applicationPagesAnalyzerResponse = await this.callApplicationPagesAnalyzerGPT(vectorStoreId)
    //         // const summaryAnalyzerResponse = await this.callSummaryAnalyzerGPT(vectorStoreId)

    //         return {
    //             entities: entityAnalyzerResponse,
    //             businessLogic: 'businessLogicAnalyzerResponse',
    //             applicationPages: 'applicationPagesAnalyzerResponse',
    //             summary: 'summaryAnalyzerResponse'
    //         }
    //     } catch (error) {
    //         console.error('Error analyzing document:', error)
    //         throw new Error('Failed to analyze the document')
    //     }
    // }

    // private async callSummaryAnalyzerGPTWithFileId(fileId: string): Promise<any> {
    //     return this.callGPTService(`Analyze the document with id ${fileId} for summary.`, SUMMARIZER_ASSISTANT_ID)
    // }

    // private async callEntityAnalyzerGPTWithFileId(fileId: string): Promise<any> {
    //     return this.callGPTService(`Analyze the document with id ${fileId} for entities.`, ENTITY_CREATOR_ASSISTANT_ID)
    // }

    // private async callBusinessLogicAnalyzerGPTWithFileId(fileId: string): Promise<any> {
    //     return this.callGPTService(`Analyze the document with id ${fileId} for business logic.`, BUSINESS_LOGIC_CREATOR_ASSISTANT_ID)
    // }

    // private async callApplicationPagesAnalyzerGPTWithFileId(fileId: string): Promise<any> {
    //     return this.callGPTService(`Analyze the document with id ${fileId} for application pages.`, PAGES_CREATOR_ASSISTANT_ID)
    // }

    // async uploadFile(file: File): Promise<string> {
    //     try {
    //         const tempFilePath = path.join(tmpdir(), file.name)
    //         fs.writeFileSync(tempFilePath, file.data)

    //         const fileStream = fs.createReadStream(tempFilePath)
    //         let vectorStore = await client.beta.vectorStores.create({
    //             name: 'Analysis Document'
    //         })

    //         await client.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, { files: [fileStream] })

    //         return vectorStore.id // Vector Store ID'si
    //     } catch (error) {
    //         console.error('Error uploading file:', error)
    //         throw new Error('Failed to upload file')
    //     }
    // }

    // async updateAssistant(vectorStoreId: string, assistantId: string): Promise<any> {
    //     await client.beta.assistants.update(assistantId, {
    //         tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } }
    //     })
    // }
}
