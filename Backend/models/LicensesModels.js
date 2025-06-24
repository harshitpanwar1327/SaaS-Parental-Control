export class LicensesModels{
    constructor(licenseData){
        this.userId = licenseData.userId;
        this.planId = licenseData.planId;
        this.license_key = licenseData.license_key;
        this.activated_at = licenseData.activated_at;
        this.expired_at = licenseData.expired_at;
        this.is_active = licenseData.is_active;
    }
}