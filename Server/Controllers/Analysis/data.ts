export const JSON_OUTPUTS = {
    airplane: {
        Roles: [
            {
                Name: 'Admin',
                Description: 'Sistem yöneticisi, kullanıcı hesapları, uçuşlar ve promosyonlar üzerinde tam kontrol sahibidir.'
            },
            {
                Name: 'User',
                Description: 'Kayıtlı kullanıcı, sisteme giriş yapabilir, uçuş arayabilir, rezervasyon yapabilir ve kendi profilini yönetebilir.'
            },
            {
                Name: 'AirlineCompany',
                Description: 'Havayolu şirketi, kendi uçuşlarını yönetebilir ve promosyon veya indirimler sağlayabilir.'
            }
        ],
        Entities: [
            {
                Name: 'User',
                PrimaryKey: 'UserId',
                Columns: [
                    {
                        Name: 'UserId',
                        Datatype: 'Guid',
                        IsUnique: true,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Kullanıcının benzersiz tanımlayıcısı.'
                    },
                    {
                        Name: 'FirstName',
                        Datatype: 'String',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Kullanıcının adı.'
                    },
                    {
                        Name: 'LastName',
                        Datatype: 'String',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Kullanıcının soyadı.'
                    },
                    {
                        Name: 'Email',
                        Datatype: 'String',
                        IsUnique: true,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [
                            {
                                RuleName: 'Email',
                                Value: null,
                                Description: 'Email formatı doğrulanmalıdır.'
                            }
                        ],
                        Description: 'Kullanıcının email adresi.'
                    },
                    {
                        Name: 'PhoneNumber',
                        Datatype: 'String',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: false,
                        DefaultValue: null,
                        ValidationRules: [
                            {
                                RuleName: 'Phone',
                                Value: null,
                                Description: 'Telefon numarası formatı doğrulanmalıdır.'
                            }
                        ],
                        Description: 'Kullanıcının telefon numarası.'
                    },
                    {
                        Name: 'Password',
                        Datatype: 'String',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [
                            {
                                RuleName: 'MinLength',
                                Value: 8,
                                Description: 'Şifre en az 8 karakter uzunluğunda olmalıdır.'
                            }
                        ],
                        Description: 'Kullanıcının şifresi.'
                    },
                    {
                        Name: 'Address',
                        Datatype: 'String',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: false,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Kullanıcının adresi (opsiyonel).'
                    }
                ],
                Description: 'Sistemdeki kullanıcıları temsil eder.'
            },
            {
                Name: 'Flight',
                PrimaryKey: 'FlightId',
                Columns: [
                    {
                        Name: 'FlightId',
                        Datatype: 'Guid',
                        IsUnique: true,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Uçuşun benzersiz tanımlayıcısı.'
                    },
                    {
                        Name: 'FlightNumber',
                        Datatype: 'String',
                        IsUnique: true,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Uçuş numarası, benzersizdir.'
                    },
                    {
                        Name: 'Departure',
                        Datatype: 'String',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Kalkış noktası.'
                    },
                    {
                        Name: 'Arrival',
                        Datatype: 'String',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Varış noktası.'
                    },
                    {
                        Name: 'Date',
                        Datatype: 'DateTime',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Uçuş tarihi.'
                    },
                    {
                        Name: 'Time',
                        Datatype: 'DateTime',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Uçuş saatı.'
                    },
                    {
                        Name: 'Price',
                        Datatype: 'Decimal',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Uçuş fiyatı.'
                    },
                    {
                        Name: 'Seats',
                        Datatype: 'Int',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Uçuşta mevcut koltuk sayısı.'
                    }
                ],
                Description: 'Uçuş bilgilerini temsil eden entity.'
            },
            {
                Name: 'Reservation',
                PrimaryKey: 'ReservationId',
                Columns: [
                    {
                        Name: 'ReservationId',
                        'Da Taylor Hanson May 21, 2021, Red Bridge, Profile Management, Profile Management, Profile Management, Profile Management, Profile Management, Profile Management, Profile Management, userProfileDetail:NFL 3/2.5/250k, userProfileDetail:NFL 3/2.5/250k, userProfileDetail:NFL 3/2.5/250k, userProfileDetail:NFL 3/2.5/250k, userProfileDetail:NFL 3/2.5/250k, userType: Public, userType: Public, userType: Public, userType: Public, userType: Public, textSize: Medium, textSize: Medium Market Conditions, Market Conditiontainet,':
                            '',
                        Datatype: '',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: false,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: ''
                    },
                    {
                        Name: 'UserId',
                        Datatype: 'Guid',
                        IsUnique: true,
                        'ForeignKeyOfareEntity: ': '',
                        Required: false,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: "Rezervasyon yapacak kullanıcının ID'si."
                    },
                    {
                        Name: 'CardNumber',
                        Datatype: 'String',
                        IsUnique: true,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [
                            {
                                RuleName: 'CreditCard',
                                Value: null,
                                Description: 'Kredi kartı numarası doğrulaması.'
                            }
                        ],
                        Description: 'Ödeme bilgileri.'
                    },
                    {
                        Name: 'ExpirationDate',
                        Datatype: 'DateTime',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        'ValidationRu longs': [],
                        Descripttion: 'Kredi kartının son kullanma tarihininvalid.'
                    },
                    {
                        Name: 'CVV',
                        Datatype: 'String',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [
                            {
                                RuleName: 'Length',
                                Value: 3,
                                Description: 'CVV kodunun 3 haneli olması.'
                            }
                        ],
                        Description: 'Kredi kartı CVV kodu.'
                    },
                    {
                        Name: 'SeatNumber',
                        Datatype: 'Int',
                        IsUnique: false,
                        ForeignKeyOf: '',
                        RefIsRequired: true,
                        DefaultValue: null,
                        ValidationRules: [],
                        Description: 'Seçilen koltuk numarası.'
                    }
                ],
                Description: 'Kullanıcılar tarafından yapılan uçuş rezervasyonlarını temsil eder.'
            }
        ],
        EntityChangeLogics: [
            {
                EntityName: 'User',
                Condition: [
                    {
                        Description: 'Admin yeni kullanıcı hesapları oluşturur.'
                    }
                ],
                OperationType: 'Create',
                'Pre/Post': 'Post',
                Description: 'Yeni kullanıcı hesabı oluşturulduktan sonra kullanıcı bilgileri doğrulanır ve başarı mesajı gösterilir.'
            },
            {
                EntityName: 'User',
                Condition: [
                    {
                        Description: 'Kullanıcı profil bilgilerini günceller.'
                    }
                ],
                OperationType: 'Update',
                'Pre/Post': 'Post',
                Description: 'Kullanıcı bilgilerinin güncellenmesinden sonra sistem kullanıcı bilgilerini doğrular ve başarı mesajı gösterir.'
            },
            {
                EntityName: 'Flight',
                Condition: [
                    {
                        Description: 'Admin veya havayolu şirketine mensup kullanıcılar yeni uçuşlar ekler.'
                    }
                ],
                OperationType: 'Create',
                'Pre/Post': 'Post',
                Description: 'Yeni uçuş eklenmesinden sonra uçuş bilgileri doğrulanır ve başarı mesajı gösterilir.'
            },
            {
                EntityName: 'Flight',
                Condition: [
                    {
                        Description: 'Admin veya havayolu şirketine mensup kullanıcılar mevcut uçuşları günceller.'
                    }
                ],
                OperationType: 'Update',
                'Pre/Post': 'Post',
                Description: 'Mevcut uçuş güncellendikten sonra uçuş bilgileri doğrulanır ve başarı mesajı gösterilir.'
            },
            {
                EntityName: 'Reservation',
                Condition: [
                    {
                        Description: 'Kullanıcı seçtiği uçuş için rezervasyon yapar.'
                    }
                ],
                OperationType: 'Create',
                'Pre/Post': 'Post',
                Description: 'Rezervasyon oluşturulduktan sonra ödeme bilgileri doğrulanır ve rezervasyon onay mesajı gösterilir.'
            },
            {
                EntityName: 'Reservation',
                Condition: [
                    {
                        Description: 'Kullanıcı mevcut rezervasyonunu iptal eder veya değiştirir.'
                    }
                ],
                OperationType: 'Update',
                'Pre/Post': 'Post',
                Description: 'Mevcut rezervasyon güncellendikten veya iptal edildikten sonra rezervasyon detayları güncellenir.'
            },
            {
                EntityName: 'Promotion',
                Condition: [
                    {
                        Description: 'Admin veya havayolu şirketi yeni promosyon veya indirim ekler.'
                    }
                ],
                OperationType: 'Create',
                'Pre/Post': 'Post',
                Description: 'Yeni promosyon veya indirim eklenmesinin ardından bilgiler doğrulanır ve başarı mesajı gösterilir.'
            },
            {
                EntityName: 'Promotion',
                Condition: [
                    {
                        Description: 'Admin veya havayolu şirketi mevcut promosyon veya indirimi günceller.'
                    }
                ],
                OperationType: 'Update',
                'Pre/Post': 'Post',
                Description: 'Mevcut promosyon veya indirim güncellendikten sonra bilgiler doğrulanır ve başarı mesajı gösterilir.'
            },
            {
                EntityName: 'Promotion',
                Condition: [
                    {
                        Description: 'Admin veya havayolu şirketi mevcut promosyon veya indirimi siler.'
                    }
                ],
                OperationType: 'Delete',
                'Pre/Post': 'Post',
                Description: 'Mevcut promosyon veya indirim silindikten sonra bilgiler güncellenir ve başarı mesajı gösterilir.'
            }
        ],
        Pages: [
            {
                Title: 'User Registration',
                Description: 'This page is used by the Admin to create new user accounts.',
                Role: [
                    {
                        RoleName: 'Admin'
                    }
                ],
                Actions: [
                    {
                        Description: 'Admin fills in the user information and submits the form to create a new user account.',
                        AffectedEntities: [
                            {
                                EntityName: 'User',
                                EntityField: 'FirstName',
                                Description: 'First name of the new user.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'LastName',
                                Description: 'Last name of the new user.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'Email',
                                Description: 'Email of the new user. It must be unique.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'PhoneNumber',
                                Description: 'Phone number of the new user.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'Password',
                                Description: 'Password for the new user account. It must be at least 8 characters long.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'Email',
                                Value: 'Must be a valid email format',
                                Description: 'The email entered must be in a valid email format.'
                            },
                            {
                                ValidationRuleName: 'Password',
                                Value: 'Must be at least 8 characters long',
                                Description: 'The password entered must be at least 8 characters long.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'User Login',
                Description: 'This page is used by the User to log into the system.',
                Role: [
                    {
                        RoleName: 'User'
                    }
                ],
                Actions: [
                    {
                        Description: 'User enters their email and password and submits the form to log into the system.',
                        AffectedEntities: [
                            {
                                EntityName: 'User',
                                EntityField: 'Email',
                                Description: 'Email of the user. It is used to identify the user.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'Password',
                                Description: 'Password of the user. It is used to authenticate the user.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'Email',
                                Value: 'Must be a valid email format',
                                Description: 'The email entered must be in a valid email format.'
                            },
                            {
                                ValidationRuleName: 'Password',
                                Value: 'Must be at least 8 characters long',
                                Description: 'The password entered must be at least 8 characters long.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'Flight Search and Filter',
                Description: 'This page is used by the User to search for flights and filter the search results.',
                Role: [
                    {
                        RoleName: 'User'
                    }
                ],
                Actions: [
                    {
                        Description: 'User enters their flight search criteria and submits the form to search for flights. User can also filter the search results.',
                        AffectedEntities: [
                            {
                                EntityName: 'Flight',
                                EntityField: 'Departure',
                                Description: 'Departure location of the flight.'
                            },
                            {
                                EntityName: 'Flight',
                                EntityField: 'Arrival',
                                Description: 'Arrival location of the flight.'
                            },
                            {
                                EntityName: 'Flight',
                                EntityField: 'Date',
                                Description: 'Date of the flight.'
                            },
                            {
                                EntityName: 'Flight',
                                EntityField: 'Time',
                                Description: 'Time of the flight.'
                            }
                        ],
                        Validation: []
                    }
                ]
            },
            {
                Title: 'Create and Manage Reservation',
                Description: 'This page is used by the User to create a reservation for a selected flight and manage their existing reservations.',
                Role: [
                    {
                        RoleName: 'User'
                    }
                ],
                Actions: [
                    {
                        Description:
                            'User selects a flight, enters their payment information and submits the form to create a reservation. User can also view, update or cancel their existing reservations.',
                        AffectedEntities: [
                            {
                                EntityName: 'Reservation',
                                EntityField: 'UserId',
                                Description: 'ID of the user who is making the reservation.'
                            },
                            {
                                EntityName: 'Reservation',
                                EntityField: 'CardNumber',
                                Description: 'Credit card number of the user. It is used for payment.'
                            },
                            {
                                EntityName: 'Reservation',
                                EntityField: 'ExpirationDate',
                                Description: 'Expiration date of the credit card. It is used for payment.'
                            },
                            {
                                EntityName: 'Reservation',
                                EntityField: 'CVV',
                                Description: 'CVV of the credit card. It is used for payment.'
                            },
                            {
                                EntityName: 'Reservation',
                                EntityField: 'SeatNumber',
                                Description: 'Seat number selected by the user.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'CreditCard',
                                Value: 'Must be a valid credit card number',
                                Description: 'The credit card number entered must be a valid credit card number.'
                            },
                            {
                                ValidationRuleName: 'ExpirationDate',
                                Value: 'Must be a valid expiration date',
                                Description: 'The expiration date entered must be a valid expiration date.'
                            },
                            {
                                ValidationRuleName: 'CVV',
                                Value: 'Must be a 3-digit number',
                                Description: 'The CVV entered must be a 3-digit number.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'Profile Management',
                Description: 'This page is used by the User to update their profile information and manage their account settings.',
                Role: [
                    {
                        RoleName: 'User'
                    }
                ],
                Actions: [
                    {
                        Description: 'User updates their profile information and submits the form to update their account.',
                        AffectedEntities: [
                            {
                                EntityName: 'User',
                                EntityField: 'FirstName',
                                Description: 'First name of the user.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'LastName',
                                Description: 'Last name of the user.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'Email',
                                Description: 'Email of the user. It must be unique.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'PhoneNumber',
                                Description: 'Phone number of the user.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'Address',
                                Description: 'Address of the user.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'Email',
                                Value: 'Must be a valid email format',
                                Description: 'The email entered must be in a valid email format.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'Add and Update Flight',
                Description: 'This page is used by the Admin or AirlineCompany to add new flights and update existing flights.',
                Role: [
                    {
                        RoleName: 'Admin'
                    },
                    {
                        RoleName: 'AirlineCompany'
                    }
                ],
                Actions: [
                    {
                        Description: 'Admin or AirlineCompany enters the flight information and submits the form to add a new flight or update an existing flight.',
                        AffectedEntities: [
                            {
                                EntityName: 'Flight',
                                EntityField: 'FlightNumber',
                                Description: 'Flight number of the flight. It must be unique.'
                            },
                            {
                                EntityName: 'Flight',
                                EntityField: 'Departure',
                                Description: 'Departure location of the flight.'
                            },
                            {
                                EntityName: 'Flight',
                                EntityField: 'Arrival',
                                Description: 'Arrival location of the flight.'
                            },
                            {
                                EntityName: 'Flight',
                                EntityField: 'Date',
                                Description: 'Date of the flight.'
                            },
                            {
                                EntityName: 'Flight',
                                EntityField: 'Time',
                                Description: 'Time of the flight.'
                            },
                            {
                                EntityName: 'Flight',
                                EntityField: 'Price',
                                Description: 'Price of the flight.'
                            },
                            {
                                EntityName: 'Flight',
                                EntityField: 'Seats',
                                Description: 'Number of seats available on the flight.'
                            }
                        ],
                        Validation: []
                    }
                ]
            },
            {
                Title: 'Promotion and Discount Management',
                Description: 'This page is used by the Admin or AirlineCompany to manage promotions and discounts.',
                Role: [
                    {
                        RoleName: 'Admin'
                    },
                    {
                        RoleName: 'AirlineCompany'
                    }
                ],
                Actions: [
                    {
                        Description:
                            'Admin or AirlineCompany enters the promotion or discount information and submits the form to add a new promotion or discount, update an existing promotion or discount, or delete a promotion or discount.',
                        AffectedEntities: [
                            {
                                EntityName: 'Promotion',
                                EntityField: 'Name',
                                Description: 'Name of the promotion or discount.'
                            },
                            {
                                EntityName: 'Promotion',
                                EntityField: 'Description',
                                Description: 'Description of the promotion or discount.'
                            },
                            {
                                EntityName: 'Promotion',
                                EntityField: 'DiscountRate',
                                Description: 'Discount rate of the promotion or discount.'
                            },
                            {
                                EntityName: 'Promotion',
                                EntityField: 'ValidityDate',
                                Description: 'Validity date of the promotion or discount.'
                            }
                        ],
                        Validation: []
                    }
                ]
            }
        ]
    },
    ecommerce: {
        Roles: [
            {
                Name: 'User',
                Description: 'Can register, login, search and filter products, add products to cart, checkout, manage orders, write reviews, and track orders.'
            },
            {
                Name: 'Seller',
                Description: 'Can add new products, manage product listings, and manage orders.'
            },
            {
                Name: 'Admin',
                Description: 'Can manage the system settings, manage user roles, and handle sensitive operations like managing coupons.'
            }
        ],
        Entities: [
            {
                Name: 'User',
                PrimaryKey: 'Id',
                Columns: [
                    {
                        Name: 'Id',
                        Datatype: 'Guid',
                        IsUnique: true,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Unique identifier of the user.'
                    },
                    {
                        Name: 'Name',
                        Datatype: 'String',
                        IsUnique: false,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Full name of the user.'
                    },
                    {
                        Name: 'Email',
                        Datatype: 'String',
                        IsUnique: true,
                        Required: true,
                        DefaultValue: null,
                        ValidationRules: [
                            {
                                RuleName: 'Email',
                                Value: null,
                                Description: 'Must be a valid email format.'
                            }
                        ],
                        Description: 'Email address of the user, used as login.'
                    },
                    {
                        Name: 'Password',
                        Datatype: 'String',
                        IsUnique: false,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Hashed password for the user.'
                    }
                ],
                Description: 'Represents a user in the system.'
            },
            {
                Name: 'Product',
                PrimaryKey: 'Id',
                Columns: [
                    {
                        Name: 'Id',
                        Datatype: 'Guid',
                        IsUnique: true,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Unique identifier of the product.'
                    },
                    {
                        Name: 'Name',
                        Datatype: 'String',
                        IsUnique: false,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Name of the product.'
                    },
                    {
                        Name: 'Description',
                        Datatype: 'String',
                        IsUnique: false,
                        Required: false,
                        DefaultValue: null,
                        Description: 'Detailed description of the product.'
                    },
                    {
                        Name: 'Price',
                        Datatype: 'Decimal',
                        IsUnique: false,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Price of the product.'
                    },
                    {
                        Name: 'Stock',
                        Datatype: 'Int',
                        IsUnique: false,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Stock availability of the product.'
                    }
                ],
                Description: 'Represents a product in the system.'
            },
            {
                Name: 'Order',
                PrimaryKey: 'Id',
                Columns: [
                    {
                        Name: 'Id',
                        Datatype: 'Guid',
                        IsUnique: true,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Unique identifier for the order.'
                    },
                    {
                        Name: 'UserId',
                        Datatype: 'Guid',
                        IsUnique: false,
                        ForeignKeyOf: 'User',
                        Required: true,
                        DefaultValue: null,
                        Description: 'Reference to the user who placed the order.'
                    },
                    {
                        Name: 'TotalPrice',
                        Datatype: 'Decimal',
                        IsUnique: false,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Total price of the order.'
                    }
                ],
                Description: 'Represents an order placed by a user.'
            },
            {
                Name: 'Review',
                PrimaryKey: 'Id',
                Columns: [
                    {
                        Name: 'Id',
                        Datatype: 'Guid',
                        IsUnique: true,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Unique identifier of the review.'
                    },
                    {
                        Name: 'UserId',
                        Datatype: 'Guid',
                        IsUnique: false,
                        ForeignKeyOf: 'User',
                        Required: true,
                        DefaultValue: null,
                        Description: 'Reference to the user who wrote the review.'
                    },
                    {
                        Name: 'ProductId',
                        Datatype: 'Guid',
                        IsUnique: false,
                        ForeignKeyOf: 'Product',
                        Required: true,
                        DefaultValue: null,
                        Description: 'Reference to the product being reviewed.'
                    },
                    {
                        Name: 'Rating',
                        Datatype: 'Int',
                        IsUnique: false,
                        Required: true,
                        DefaultValue: null,
                        Description: 'Rating given by the user.'
                    },
                    {
                        Name: 'Text',
                        Datatype: 'String',
                        IsUnique: false,
                        Required: false,
                        DefaultValue: null,
                        Description: 'Text of the review.'
                    }
                ],
                Description: 'Represents a review written by a user for a product.'
            }
        ],
        UseCases: [
            {
                UseCaseName: 'UserRegistration',
                Actors: ['NewUser'],
                Description: 'New user registers by filling out the registration form with their name, email, and password.',
                Preconditions: ['User is on the registration page.'],
                Postconditions: ['User account is created and user is redirected to the login page.'],
                CourseOfEvents: [
                    'User navigates to the registration page.',
                    'User fills in the registration form with name, email, and password.',
                    "User clicks the 'Register' button.",
                    'System validates the input data.',
                    'System creates a new user account in the database.',
                    'System redirects the user to the login page.'
                ],
                Exceptions: ['If the email is already in use, the system displays an error message.', 'If the input data is invalid, the system displays an error message.'],
                SpecialRequirements: ['Form validation for email format and password strength.']
            },
            {
                UseCaseName: 'UserLogin',
                Actors: ['User'],
                Description: 'Existing user logs in by providing their email and password.',
                Preconditions: ['User is on the login page.', 'User has a registered account.'],
                Postconditions: ['User is authenticated and redirected to the user dashboard.'],
                CourseOfEvents: [
                    'User navigates to the login page.',
                    'User enters their email and password.',
                    "User clicks the 'Login' button.",
                    'System validates the credentials.',
                    'System generates a JWT token.',
                    'System redirects the user to the user dashboard.'
                ],
                Exceptions: ['If the email or password is incorrect, the system displays an error message.'],
                SpecialRequirements: ['Form validation for email format.']
            },
            {
                UseCaseName: 'ProductSearchAndFilter',
                Actors: ['User'],
                Description: 'User searches for products using the search bar and filters the results by price, category, and rating.',
                Preconditions: ['User is on the main page or any page with a search bar.'],
                Postconditions: ['Filtered product list is displayed to the user.'],
                CourseOfEvents: [
                    'User enters a product name in the search bar.',
                    "User clicks the 'Search' button.",
                    'System retrieves matching products from the database.',
                    'System displays the list of matching products.',
                    'User applies filters (price, category, rating).',
                    'System updates the product list based on the applied filters.'
                ],
                Exceptions: ["If no products match the search criteria, the system displays a 'No products found' message."],
                SpecialRequirements: ['Search bar with autocomplete feature.', 'Filter options for price range, categories, and ratings.']
            },
            {
                UseCaseName: 'AddProductToCart',
                Actors: ['User'],
                Description: 'User adds a product to their shopping cart from the product page.',
                Preconditions: ['User is on a product page.'],
                Postconditions: ["Product is added to the user's shopping cart."],
                CourseOfEvents: [
                    'User navigates to a product page.',
                    "User clicks the 'Add to Cart' button.",
                    "System adds the product to the user's shopping cart.",
                    'System displays a confirmation message.'
                ],
                Exceptions: ["If the product is out of stock, the system displays an 'Out of stock' message."],
                SpecialRequirements: ['Real-time stock availability check.']
            },
            {
                UseCaseName: 'CheckoutAndPayment',
                Actors: ['User'],
                Description: 'User proceeds to checkout, enters payment details, and completes the purchase.',
                Preconditions: ['User has products in their shopping cart.', 'User is on the checkout page.'],
                Postconditions: ['Order is created and payment is processed.'],
                CourseOfEvents: [
                    'User navigates to the checkout page.',
                    'User reviews the order summary.',
                    'User enters shipping address.',
                    'User enters payment details (credit card information).',
                    'User applies a discount coupon if available.',
                    "User clicks the 'Place Order' button.",
                    'System validates the payment details.',
                    'System processes the payment through Stripe API.',
                    'System creates a new order in the database.',
                    'System displays an order confirmation message.'
                ],
                Exceptions: ["If the payment is declined, the system displays a 'Payment declined' message.", "If the coupon is invalid, the system displays an 'Invalid coupon' message."],
                SpecialRequirements: ['Integration with Stripe API for payment processing.', 'Form validation for credit card information.']
            },
            {
                UseCaseName: 'SellerAddProduct',
                Actors: ['Seller'],
                Description: 'Seller adds a new product to the platform by filling out the product details form.',
                Preconditions: ['Seller is logged in and on the seller panel.'],
                Postconditions: ['New product is added to the platform and visible to users.'],
                CourseOfEvents: [
                    'Seller navigates to the seller panel.',
                    "Seller clicks the 'Add New Product' button.",
                    'Seller fills in the product details form (name, description, price, stock).',
                    "Seller clicks the 'Save' button.",
                    'System validates the product details.',
                    'System adds the new product to the database.',
                    'System displays a confirmation message.'
                ],
                Exceptions: ['If the product details are invalid, the system displays an error message.'],
                SpecialRequirements: ['Form validation for product details.']
            },
            {
                UseCaseName: 'SellerManageOrders',
                Actors: ['Seller'],
                Description: 'Seller manages orders by updating the order status.',
                Preconditions: ['Seller is logged in and on the seller panel.'],
                Postconditions: ['Order status is updated in the system.'],
                CourseOfEvents: [
                    'Seller navigates to the seller panel.',
                    'Seller views the list of orders.',
                    'Seller selects an order to update.',
                    "Seller updates the order status (e.g., 'Shipped', 'Delivered').",
                    "Seller clicks the 'Update' button.",
                    'System updates the order status in the database.',
                    'System displays a confirmation message.'
                ],
                Exceptions: ['If the order status update fails, the system displays an error message.'],
                SpecialRequirements: ['Real-time order status update.']
            },
            {
                UseCaseName: 'UserWriteReview',
                Actors: ['User'],
                Description: 'User writes a review and rates a product they have purchased.',
                Preconditions: ['User is logged in.', 'User has purchased the product.'],
                Postconditions: ['Review and rating are added to the product page.'],
                CourseOfEvents: [
                    'User navigates to their order history.',
                    'User selects a product to review.',
                    'User writes a review in the text area.',
                    'User selects a rating (1 to 5 stars).',
                    "User clicks the 'Submit' button.",
                    'System validates the review and rating.',
                    'System adds the review and rating to the product page.',
                    'System displays a confirmation message.'
                ],
                Exceptions: ['If the review or rating is invalid, the system displays an error message.'],
                SpecialRequirements: ['Form validation for review text and rating.']
            },
            {
                UseCaseName: 'UserTrackOrder',
                Actors: ['User'],
                Description: 'User tracks the status of their order from the user panel.',
                Preconditions: ['User is logged in.', 'User has placed an order.'],
                Postconditions: ['Order status is displayed to the user.'],
                CourseOfEvents: [
                    'User navigates to the user panel.',
                    "User clicks on 'Order History'.",
                    'User selects an order to track.',
                    'System retrieves the order status from the database.',
                    'System displays the order status to the user.'
                ],
                Exceptions: ['If the order status cannot be retrieved, the system displays an error message.'],
                SpecialRequirements: ['Real-time order status retrieval.']
            },
            {
                UseCaseName: 'AdminManageCoupons',
                Actors: ['Admin'],
                Description: 'Admin manages discount coupons by adding, updating, or deleting them.',
                Preconditions: ['Admin is logged in and on the admin panel.'],
                Postconditions: ['Coupons are added, updated, or deleted in the system.'],
                CourseOfEvents: [
                    'Admin navigates to the admin panel.',
                    "Admin clicks on 'Manage Coupons'.",
                    'Admin adds a new coupon by filling in the coupon details (code, discount percentage, expiration date).',
                    'Admin updates an existing coupon by modifying the coupon details.',
                    'Admin deletes a coupon.',
                    'System validates the coupon details.',
                    'System updates the coupon information in the database.',
                    'System displays a confirmation message.'
                ],
                Exceptions: ['If the coupon details are invalid, the system displays an error message.'],
                SpecialRequirements: ['Form validation for coupon details.']
            }
        ],

        EntityChangeLogics: [
            {
                EntityName: 'User',
                Condition: [{ Description: 'User is on the registration page.' }],
                OperationType: 'Create',
                'Pre/Post': 'Post',
                Description: 'System creates a new user account in the database and redirects the user to the login page.'
            },
            {
                EntityName: 'User',
                Condition: [{ Description: 'User is on the login page.' }, { Description: 'User has a registered account.' }],
                OperationType: 'Update',
                'Pre/Post': 'Post',
                Description: 'System validates the credentials, generates a JWT token, and redirects the user to the user dashboard.'
            },
            {
                EntityName: 'Product',
                Condition: [
                    {
                        Description: 'User is on the main page or any page with a search bar.'
                    }
                ],
                OperationType: 'Read',
                'Pre/Post': 'Post',
                Description: 'System retrieves matching products from the database and displays the list of matching products.'
            },
            {
                EntityName: 'Product',
                Condition: [{ Description: 'User applies filters (price, category, rating).' }],
                OperationType: 'Read',
                'Pre/Post': 'Post',
                Description: 'System updates the product list based on the applied filters.'
            },
            {
                EntityName: 'Product',
                Condition: [{ Description: 'User is on a product page.' }],
                OperationType: 'Update',
                'Pre/Post': 'Post',
                Description: "System adds the product to the user's shopping cart and displays a confirmation message."
            },
            {
                EntityName: 'Order',
                Condition: [{ Description: 'User has products in their shopping cart.' }, { Description: 'User is on the checkout page.' }],
                OperationType: 'Create',
                'Pre/Post': 'Post',
                Description: 'System validates the payment details, processes the payment through Stripe API, creates a new order in the database, and displays an order confirmation message.'
            },
            {
                EntityName: 'Product',
                Condition: [{ Description: 'Seller is logged in and on the seller panel.' }],
                OperationType: 'Create',
                'Pre/Post': 'Post',
                Description: 'System validates the product details, adds the new product to the database, and displays a confirmation message.'
            },
            {
                EntityName: 'Order',
                Condition: [{ Description: 'Seller is logged in and on the seller panel.' }],
                OperationType: 'Update',
                'Pre/Post': 'Post',
                Description: 'System updates the order status in the database and displays a confirmation message.'
            },
            {
                EntityName: 'Review',
                Condition: [{ Description: 'User is logged in.' }, { Description: 'User has purchased the product.' }],
                OperationType: 'Create',
                'Pre/Post': 'Post',
                Description: 'System validates the review and rating, adds the review and rating to the product page, and displays a confirmation message.'
            },
            {
                EntityName: 'Order',
                Condition: [{ Description: 'User is logged in.' }, { Description: 'User has placed an order.' }],
                OperationType: 'Read',
                'Pre/Post': 'Post',
                Description: 'System retrieves the order status from the database and displays the order status to the user.'
            },
            {
                EntityName: 'Coupon',
                Condition: [{ Description: 'Admin is logged in and on the admin panel.' }],
                OperationType: 'Create',
                'Pre/Post': 'Post',
                Description: 'System validates the coupon details, updates the coupon information in the database, and displays a confirmation message.'
            },
            {
                EntityName: 'Coupon',
                Condition: [{ Description: 'Admin is logged in and on the admin panel.' }],
                OperationType: 'Update',
                'Pre/Post': 'Post',
                Description: 'System validates the coupon details, updates the coupon information in the database, and displays a confirmation message.'
            },
            {
                EntityName: 'Coupon',
                Condition: [{ Description: 'Admin is logged in and on the admin panel.' }],
                OperationType: 'Delete',
                'Pre/Post': 'Post',
                Description: 'System deletes the coupon information from the database and displays a confirmation message.'
            }
        ],
        Pages: [
            {
                Title: 'Registration Page',
                Description: 'This page allows new users to register by filling out a form with their name, email, and password.',
                Role: [{ RoleName: 'NewUser' }],
                Actions: [
                    {
                        Description: "User fills in the registration form with name, email, and password and clicks the 'Register' button.",
                        AffectedEntities: [
                            {
                                EntityName: 'User',
                                EntityField: 'Name',
                                Description: "User's full name is stored."
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'Email',
                                Description: "User's email is stored and used as login."
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'Password',
                                Description: "User's password is hashed and stored."
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'Email',
                                Value: null,
                                Description: 'Email must be in a valid format.'
                            },
                            {
                                ValidationRuleName: 'PasswordStrength',
                                Value: null,
                                Description: 'Password must meet certain strength criteria.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'Login Page',
                Description: 'This page allows existing users to login by providing their email and password.',
                Role: [{ RoleName: 'User' }],
                Actions: [
                    {
                        Description: "User enters their email and password and clicks the 'Login' button.",
                        AffectedEntities: [
                            {
                                EntityName: 'User',
                                EntityField: 'Email',
                                Description: "User's email is used to find the corresponding account."
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'Password',
                                Description: "User's password is hashed and compared with the stored hash."
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'Email',
                                Value: null,
                                Description: 'Email must be in a valid format.'
                            },
                            {
                                ValidationRuleName: 'PasswordMatch',
                                Value: null,
                                Description: 'Password must match the stored hash.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'Product Search Page',
                Description: 'This page allows users to search for products using the search bar and filter the results by price, category, and rating.',
                Role: [{ RoleName: 'User' }],
                Actions: [
                    {
                        Description: "User enters a product name in the search bar, clicks the 'Search' button, and applies filters.",
                        AffectedEntities: [
                            {
                                EntityName: 'Product',
                                EntityField: 'Name',
                                Description: 'Product name is used to retrieve matching products.'
                            },
                            {
                                EntityName: 'Product',
                                EntityField: 'Price',
                                Description: 'Product price is used to filter the results.'
                            },
                            {
                                EntityName: 'Product',
                                EntityField: 'Category',
                                Description: 'Product category is used to filter the results.'
                            },
                            {
                                EntityName: 'Review',
                                EntityField: 'Rating',
                                Description: 'Product rating is used to filter the results.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'SearchNotEmpty',
                                Value: null,
                                Description: 'Search bar must not be empty.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'Product Page',
                Description: 'This page displays the details of a product and allows users to add the product to their shopping cart.',
                Role: [{ RoleName: 'User' }],
                Actions: [
                    {
                        Description: "User clicks the 'Add to Cart' button.",
                        AffectedEntities: [
                            {
                                EntityName: 'Product',
                                EntityField: 'Id',
                                Description: "Product ID is used to add the product to the user's shopping cart."
                            },
                            {
                                EntityName: 'Product',
                                EntityField: 'Stock',
                                Description: 'Product stock is checked and decreased by 1.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'StockAvailability',
                                Value: null,
                                Description: 'Product must be in stock.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'Checkout Page',
                Description: 'This page allows users to review their order, enter shipping address and payment details, apply a discount coupon, and complete the purchase.',
                Role: [{ RoleName: 'User' }],
                Actions: [
                    {
                        Description: "User reviews the order, enters shipping address and payment details, applies a discount coupon, and clicks the 'Place Order' button.",
                        AffectedEntities: [
                            {
                                EntityName: 'Order',
                                EntityField: 'UserId',
                                Description: 'User ID is used to create a new order.'
                            },
                            {
                                EntityName: 'Order',
                                EntityField: 'TotalPrice',
                                Description: 'Total price of the order is calculated and stored.'
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'ShippingAddress',
                                Description: "User's shipping address is stored with the order."
                            },
                            {
                                EntityName: 'User',
                                EntityField: 'PaymentDetails',
                                Description: "User's payment details are used to process the payment."
                            },
                            {
                                EntityName: 'Coupon',
                                EntityField: 'Code',
                                Description: 'Coupon code is used to apply a discount to the order.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'ShippingAddress',
                                Value: null,
                                Description: 'Shipping address must be valid.'
                            },
                            {
                                ValidationRuleName: 'PaymentDetails',
                                Value: null,
                                Description: 'Payment details must be valid.'
                            },
                            {
                                ValidationRuleName: 'Coupon',
                                Value: null,
                                Description: 'Coupon must be valid and not expired.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'Seller Panel',
                Description: 'This page allows sellers to add new products, manage product listings, and manage orders.',
                Role: [{ RoleName: 'Seller' }],
                Actions: [
                    {
                        Description: "Seller adds a new product by filling in the product details form and clicking the 'Save' button.",
                        AffectedEntities: [
                            {
                                EntityName: 'Product',
                                EntityField: 'Name',
                                Description: 'Product name is stored.'
                            },
                            {
                                EntityName: 'Product',
                                EntityField: 'Description',
                                Description: 'Product description is stored.'
                            },
                            {
                                EntityName: 'Product',
                                EntityField: 'Price',
                                Description: 'Product price is stored.'
                            },
                            {
                                EntityName: 'Product',
                                EntityField: 'Stock',
                                Description: 'Product stock is stored.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'ProductDetails',
                                Value: null,
                                Description: 'Product details must be valid.'
                            }
                        ]
                    },
                    {
                        Description: "Seller updates the status of an order by selecting an order and clicking the 'Update' button.",
                        AffectedEntities: [
                            {
                                EntityName: 'Order',
                                EntityField: 'Status',
                                Description: 'Order status is updated.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'OrderStatus',
                                Value: null,
                                Description: 'Order status must be valid.'
                            }
                        ]
                    }
                ]
            },
            {
                Title: 'Order History Page',
                Description: 'This page allows users to write a review and rate a product they have purchased, and track the status of their orders.',
                Role: [{ RoleName: 'User' }],
                Actions: [
                    {
                        Description: "User writes a review, selects a rating, and clicks the 'Submit' button.",
                        AffectedEntities: [
                            {
                                EntityName: 'Review',
                                EntityField: 'UserId',
                                Description: 'User ID is used to create a new review.'
                            },
                            {
                                EntityName: 'Review',
                                EntityField: 'ProductId',
                                Description: 'Product ID is used to create a new review.'
                            },
                            {
                                EntityName: 'Review',
                                EntityField: 'Rating',
                                Description: "User's rating is stored with the review."
                            },
                            {
                                EntityName: 'Review',
                                EntityField: 'Text',
                                Description: "User's review text is stored."
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'ReviewText',
                                Value: null,
                                Description: 'Review text must be valid.'
                            },
                            {
                                ValidationRuleName: 'Rating',
                                Value: null,
                                Description: 'Rating must be between 1 and 5.'
                            }
                        ]
                    },
                    {
                        Description: 'User selects an order to track.',
                        AffectedEntities: [
                            {
                                EntityName: 'Order',
                                EntityField: 'Status',
                                Description: 'Order status is retrieved and displayed.'
                            }
                        ],
                        Validation: []
                    }
                ]
            },
            {
                Title: 'Admin Panel',
                Description: 'This page allows admins to manage discount coupons by adding, updating, or deleting them.',
                Role: [{ RoleName: 'Admin' }],
                Actions: [
                    {
                        Description: "Admin adds, updates, or deletes a coupon by filling in the coupon details form and clicking the 'Save' or 'Delete' button.",
                        AffectedEntities: [
                            {
                                EntityName: 'Coupon',
                                EntityField: 'Code',
                                Description: 'Coupon code is stored, updated, or deleted.'
                            },
                            {
                                EntityName: 'Coupon',
                                EntityField: 'DiscountPercentage',
                                Description: 'Discount percentage is stored, updated, or deleted.'
                            },
                            {
                                EntityName: 'Coupon',
                                EntityField: 'ExpirationDate',
                                Description: 'Expiration date is stored, updated, or deleted.'
                            }
                        ],
                        Validation: [
                            {
                                ValidationRuleName: 'CouponDetails',
                                Value: null,
                                Description: 'Coupon details must be valid.'
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

export const SUGGESTIONS = {
    airplane: {
        html: "<ul><li>Proje tanımı kısmındaki tüm bilgiler, JSON dosyasında ilgili bölümlerde doğru olarak belirtilmiştir. ✔</li><li>Fonksiyonel gereksinimler, JSON dosyasında Use Case'ler olarak detaylandırılmıştır. Ancak, bazı fonksiyonel gereksinimler eksik olabilir. Örneğin, kullanıcı bildirimlerine dair bir Use Case bulunmamaktadır. ❌</li><li>Sayfalar bölümünde belirtilen tüm sayfalar, JSON dosyasında da açıklanmıştır. Sayfa yapıları ve açıklamalar tutarlıdır. ✔</li><li>Kullanım senaryoları (Use Cases), belirli bir detay seviyesinde JSON dosyasında açıklanmıştır. Ancak bazı senaryolar çok detaylı iken bazıları daha yüzeysel kalmış olabilir. ❌</li><li>JSON dosyasında belirtilen roller, iş analiz dokümanındaki rollerle uyumludur ve her rolün tanımı eksiksiz olarak verilmiştir. ✔</li><li>Entity diagramı ve alanlar, iş analizinde belirtilen bilgilerle büyük ölçüde uyumludur, ancak bazı validation kuralları eksik veya daha detaylandırılabilir. ❌</li><li>Promosyon ve İndirim Yönetimi ile ilgili sayfa ve Use Case'ler doğru ve eksiksiz olarak belirtilmiştir. ✔</li><li>Sayfa ve User Entity ile ilgili validation kuralları yaklaşık olarak doğru, ancak email ve password validation kuralları daha detaylı olabilir. ❌</li><li>Senaryolarda yer alan Course of Events başlıkları oldukça açıklayıcı ve detaylı yazılmıştır. ✔</li><li>Entity Change Logics bölümü, iş analizi dokümanında belirtilmiş olmasa da, sistemin nasıl çalışacağına dair ek bir katma değer sağlar. ✔</li></ul>"
    },
    ecommerce: {
        html: '<ul><li>JSON formatında gereksinimler, roller, varlıklar ve kullanım senaryoları ayrıntılı bir şekilde tanımlanmıştır. ✔️ </li><li>Her bir varlık için gerekli olan tüm kolonlar, veri tipleri ve doğrulamalar detaylı şekilde belirtilmiştir. ✔️</li><li>UseCase ve EntityChangeLogics gibi bölümler orijinal analiz dokümanıyla uyumlu ve tam kapsamlı olarak belirtilmiştir. ✔️</li><li>Admin ve kullanıcı rollerinin görevleri net bir şekilde belirtilmiş ve ayrıntılandırılmıştır. ✔️</li><li>Sistem, entegrasyon ve kullanıcı kabul testlerine dair bilgiler eksik veya belirtilmemiştir. ❌</li><li> Teknik gereksinimler bölümünde belirtilen bazı sistem gereksinimleri (güvenlik ve performans optimizasyonları gibi) JSON dosyasında yer almamaktadır. ❌</li><li>JSON dosyasında yer alan tüm kullanıcı panelleri ve kullanıcılara yönelik sayfalar detaylı şekilde işlenmiştir. ✔️</li><li>Ödeme sistemine dair detaylı entegrasyon bilgisi (Stripe API kullanımı) JSON dosyasında belirtilmiş ancak eksiksiz teknik gereksinimler ile yer almamıştır. ❌</li></ul>'
    }
}

export const SUMMARIES = {
    airplane: {
        html: '<ul>\n <li><strong>Number of Tables (Entities):</strong> 3\n <ul>\n <li>User</li>\n <li>Flight</li>\n <li>Reservation</li>\n </ul>\n </li>\n <li><strong>Number of Roles:</strong> 3\n <ul>\n <li>Admin</li>\n <li>User</li>\n <li>AirlineCompany</li>\n </ul>\n </li>\n <li><strong>Number of Pages:</strong> 7\n <ul>\n <li><strong>User Registration:</strong> This page is used by the Admin to create new user accounts.\n <ul>\n <li>Role: Admin</li>\n <li>Actions:\n <ul>\n <li>Description: Admin fills in the user information and submits the form to create a new user account.</li>\n <li>Affected Entities:\n <ul>\n <li>User: FirstName, LastName, Email, PhoneNumber, Password</li>\n </ul>\n </li>\n <li>Validation:\n <ul>\n <li>Email: Must be a valid email format</li>\n <li>Password: Must be at least 8 characters long</li>\n </ul>\n </li>\n </ul>\n </li>\n </ul>\n </li>\n <li><strong>User Login:</strong> This page is used by the User to log into the system.\n <ul>\n <li>Role: User</li>\n <li>Actions:\n <ul>\n <li>Description: User enters their email and password and submits the form to log into the system.</li>\n <li>Affected Entities:\n <ul>\n <li>User: Email, Password</li>\n </ul>\n </li>\n <li>Validation:\n <ul>\n <li>Email: Must be a valid email format</li>\n <li>Password: Must be at least 8 characters long</li>\n </ul>\n </li>\n </ul>\n </li>\n </ul>\n </li>\n <li><strong>Flight Search and Filter:</strong> This page is used by the User to search for flights and filter the search results.\n <ul>\n <li>Role: User</li>\n <li>Actions:\n <ul>\n <li>Description: User enters their flight search criteria and submits the form to search for flights. User can also filter the search results.</li>\n <li>Affected Entities:\n <ul>\n <li>Flight: Departure, Arrival, Date, Time</li>\n </ul>\n </li>\n <li>Validation: None</li>\n </ul>\n </li>\n </ul>\n </li>\n <li><strong>Create and Manage Reservation:</strong> This page is used by the User to create a reservation for a selected flight and manage their existing reservations.\n <ul>\n <li>Role: User</li>\n <li>Actions:\n <ul>\n <li>Description: User selects a flight, enters their payment information and submits the form to create a reservation. User can also view, update or cancel their existing reservations.</li>\n <li>Affected Entities:\n <ul>\n <li>Reservation: UserId, CardNumber, ExpirationDate, CVV, SeatNumber</li>\n </ul>\n </li>\n <li>Validation:\n <ul>\n <li>CreditCard: Must be a valid credit card number</li>\n <li>ExpirationDate: Must be a valid expiration date</li>\n <li>CVV: Must be a 3-digit number</li>\n </ul>\n </li>\n </ul>\n </li>\n </ul>\n </li>\n <li><strong>Profile Management:</strong> This page is used by the User to update their profile information and manage their account settings.\n <ul>\n <li>Role: User</li>\n <li>Actions:\n <ul>\n <li>Description: User updates their profile information and submits the form to update their account.</li>\n <li>Affected Entities:\n <ul>\n <li>User: FirstName, LastName, Email, PhoneNumber, Address</li>\n </ul>\n </li>\n <li>Validation:\n <ul>\n <li>Email: Must be a valid email format</li>\n </ul>\n </li>\n </ul>\n </li>\n </ul>\n </li>\n <li><strong>Add and Update Flight:</strong> This page is used by the Admin or AirlineCompany to add new flights and update existing flights.\n <ul>\n <li>Roles: Admin, AirlineCompany</li>\n <li>Actions:\n <ul>\n <li>Description: Admin or AirlineCompany enters the flight information and submits the form to add a new flight or update an existing flight.</li>\n <li>Affected Entities:\n <ul>\n <li>Flight: FlightNumber, Departure, Arrival, Date, Time, Price, Seats</li>\n </ul>\n </li>\n <li>Validation: None</li>\n </ul>\n </li>\n </ul>\n </li>\n <li><strong>Promotion and Discount Management:</strong> This page is used by the Admin or AirlineCompany to manage promotions and discounts.\n <ul>\n <li>Roles: Admin, AirlineCompany</li>\n <li>Actions:\n <ul>\n <li>Description: Admin or AirlineCompany enters the promotion or discount information and submits the form to add a new promotion or discount, update an existing promotion or discount, or delete a promotion or discount.</li>\n <li>Affected Entities:\n <ul>\n <li>Promotion: Name, Description, DiscountRate, ValidityDate</li>\n </ul>\n </li>\n <li>Validation: None</li>\n </ul>\n </li>\n </ul>\n </li>\n </ul>\n </li>\n</ul>'
    },
    ecommerce: {
        html: "<ul>\n <li>Roles: 3\n <ul>\n <li>User: Can register, login, search and filter products, add products to cart, checkout, manage orders, write reviews, and track orders.</li>\n <li>Seller: Can add new products, manage product listings, and manage orders.</li>\n <li>Admin: Can manage the system settings, manage user roles, and handle sensitive operations like managing coupons.</li>\n </ul>\n </li>\n <li>Tables: 4\n <ul>\n <li>User: Represents a user in the system.\n <ul>\n <li>Id: Unique identifier of the user (Guid, Unique, Required).</li>\n <li>Name: Full name of the user (String, Required).</li>\n <li>Email: Email address of the user, used as login (String, Unique, Required, Valid Email).</li>\n <li>Password: Hashed password for the user (String, Required).</li>\n </ul>\n </li>\n <li>Product: Represents a product in the system.\n <ul>\n <li>Id: Unique identifier of the product (Guid, Unique, Required).</li>\n <li>Name: Name of the product (String, Required).</li>\n <li>Description: Detailed description of the product (String).</li>\n <li>Price: Price of the product (Decimal, Required).</li>\n <li>Stock: Stock availability of the product (Int, Required).</li>\n </ul>\n </li>\n <li>Order: Represents an order placed by a user.\n <ul>\n <li>Id: Unique identifier for the order (Guid, Unique, Required).</li>\n <li>UserId: Reference to the user who placed the order (Guid, Required).</li>\n <li>TotalPrice: Total price of the order (Decimal, Required).</li>\n </ul>\n </li>\n <li>Review: Represents a review written by a user for a product.\n <ul>\n <li>Id: Unique identifier of the review (Guid, Unique, Required).</li>\n <li>UserId: Reference to the user who wrote the review (Guid, Required).</li>\n <li>ProductId: Reference to the product being reviewed (Guid, Required).</li>\n <li>Rating: Rating given by the user (Int, Required).</li>\n <li>Text: Text of the review (String).</li>\n </ul>\n </li>\n </ul>\n </li>\n <li>Pages: 8\n <ul>\n <li>Registration Page\n <ul>\n <li>Description: This page allows new users to register by filling out a form with their name, email, and password.</li>\n <li>Role: NewUser</li>\n <li>Actions\n <ul>\n <li>User fills in the registration form with name, email, and password and clicks the 'Register' button.</li>\n <li>Validation: Email must be in a valid format, Password must meet certain strength criteria.</li>\n </ul>\n </li>\n </ul>\n </li>\n <li>Login Page\n <ul>\n <li>Description: This page allows existing users to login by providing their email and password.</li>\n <li>Role: User</li>\n <li>Actions\n <ul>\n <li>User enters their email and password and clicks the 'Login' button.</li>\n <li>Validation: Email must be in a valid format, Password must match the stored hash.</li>\n </ul>\n </li>\n </ul>\n </li>\n <li>Product Search Page\n <ul>\n <li>Description: This page allows users to search for products using the search bar and filter the results by price, category, and rating.</li>\n <li>Role: User</li>\n <li>Actions\n <ul>\n <li>User enters a product name in the search bar, clicks the 'Search' button, and applies filters.</li>\n <li>Validation: Search bar must not be empty.</li>\n </ul>\n </li>\n </ul>\n </li>\n <li>Product Page\n <ul>\n <li>Description: This page displays the details of a product and allows users to add the product to their shopping cart.</li>\n <li>Role: User</li>\n <li>Actions\n <ul>\n <li>User clicks the 'Add to Cart' button.</li>\n <li>Validation: Product must be in stock.</li>\n </ul>\n </li>\n </ul>\n </li>\n <li>Checkout Page\n <ul>\n <li>Description: This page allows users to review their order, enter shipping address and payment details, apply a discount coupon, and complete the purchase.</li>\n <li>Role: User</li>\n <li>Actions\n <ul>\n <li>User reviews the order, enters shipping address and payment details, applies a discount coupon, and clicks the 'Place Order' button.</li>\n <li>Validation: Shipping address must be valid, Payment details must be valid, Coupon must be valid and not expired.</li>\n </ul>\n </li>\n </ul>\n </li>\n <li>Seller Panel\n <ul>\n <li>Description: This page allows sellers to add new products, manage product listings, and manage orders.</li>\n <li>Role: Seller</li>\n <li>Actions\n <ul>\n <li>Seller adds a new product by filling in the product details form and clicking the 'Save' button.</li>\n <li>Validation: Product details must be valid.</li>\n <li>Seller updates the status of an order by selecting an order and clicking the 'Update' button.</li>\n <li>Validation: Order status must be valid.</li>\n </ul>\n </li>\n </ul>\n </li>\n <li>Order History Page\n <ul>\n <li>Description: This page allows users to write a review and rate a product they have purchased, and track the status of their orders.</li>\n <li>Role: User</li>\n <li>Actions\n <ul>\n <li>User writes a review, selects a rating, and clicks the 'Submit' button.</li>\n <li>Validation: Review text must be valid, Rating must be between 1 and 5.</li>\n <li>User selects an order to track.</li>\n </ul>\n </li>\n </ul>\n </li>\n <li>Admin Panel\n <ul>\n <li>Description: This page allows admins to manage discount coupons by adding, updating, or deleting them.</li>\n <li>Role: Admin</li>\n <li>Actions\n <ul>\n <li>Admin adds, updates, or deletes a coupon by filling in the coupon details form and clicking the 'Save' or 'Delete' button.</li>\n <li>Validation: Coupon details must be valid.</li>\n </ul>\n </li>\n </ul>\n </li>\n </ul>\n </li>\n</ul>"
    }
}
