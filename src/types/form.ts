export type HealthFormDoc = {
  trust: string
  municipality: string
  name: string
  idNumber: string
  sex: string
  nationality: string
  certNumber: string
  profession: string
  issueDateH?: string
  issueDateG: string
  expiryDateH?: string
  expiryDateG: string
  eduProgramType?: string
  eduProgramEndH?: string
  licenseNumber: string
  facilityName: string
  facilityNumber: string
  photoUrl?: string | null
  createdAt: Date
}
